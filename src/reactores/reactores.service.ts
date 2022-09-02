import { Injectable } from '@nestjs/common';
import { CreateReactorDto } from './dto/create-reactor.dto';
import { UpdateReactorDto } from './dto/update-reactor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reactor } from './entities/reactor.entity';

@Injectable()
export class ReactoresService {
  constructor(
    @InjectRepository (Reactor) 
    private reactoresRepository: Repository<Reactor>,
    ) {}

  async create(createReactorDto: CreateReactorDto): Promise<Reactor>{
    return this.reactoresRepository.save(createReactorDto);
  }

  async findAll(): Promise<Reactor[]> {
    return this.reactoresRepository.find({ relations: ['sensores'] });
  }

  async findOne(idReactor: number):Promise<Reactor> {
    return this.reactoresRepository.findOne({
      where: {idReactor},
      relations :['sensores'],
    });
  }

  async update(idReactor: number, updateReactorDto: UpdateReactorDto): Promise<Reactor>{
    let toUpdate = await this.reactoresRepository.findOne({where: {idReactor}});
    let updated = Object.assign(toUpdate, updateReactorDto);
    return this.reactoresRepository.save(updated);
  }

  async remove(idReactor: number): Promise<any> {
    return this.reactoresRepository.delete({idReactor});
  }

  async csvReader(path: string) : Promise<any>{
    path = 'C:\Users\salva\Desktop\DatosIFAPATFG\Registro_Reactores_01_08_22.csv'
    const fs = require('fs'); // filesystem
    const csv = require('csv-parse');// Encargado de parsear

    const parseador = csv({
      delimiter: ';',//Delimitador, por defecto punto y coma 
      cast: true, // Intentar convertir las cadenas a tipos nativos
      comment: '#' // El carácter con el que comienzan las líneas de los comentarios, en caso de existir
    });
      parseador.on('readable', function () {
        let fila;
        while (fila = parseador.read()) {
          console.log("Tenemos una fila:", fila);
        }
      });
      parseador.on('error', function (err) {
        console.error("Error al leer CSV:", err.message);
      });
    fs.createReadStream(path) // Abrir archivo
      .pipe(parseador) // Pasarlo al parseador a través de una tubería
      .on("end", function () {// Y al finalizar, terminar lo necesario
         console.log("Se ha terminado de leer el archivo");
        parseador.end();
    });
  }
}
