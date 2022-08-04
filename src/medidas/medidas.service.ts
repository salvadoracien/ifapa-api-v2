import { Injectable } from '@nestjs/common';
import { CreateMedidaDto } from './dto/create-medida.dto';
import { UpdateMedidaDto } from './dto/update-medida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medida } from './entities/medida.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedidasService {

    constructor( 
        @InjectRepository(Medida)
        private medidasRepository: Repository<Medida>,
      ) {}
    
      create(createMedidaDto: CreateMedidaDto): Promise<Medida> {
        return this.medidasRepository.save(createMedidaDto);
      }
    
      async findAll(params): Promise<Medida[]> {
        return this.medidasRepository.find();
      }
    
      async findMedida(hora: number): Promise<Medida> {
        return await this.medidasRepository.findOne({ where: { hora }});
      }
    
      async update(hora: number, updateMedidaDto: UpdateMedidaDto) {
        return this.medidasRepository.update(hora, updateMedidaDto);
      }
    
      async deleteMedida(hora: number): Promise<any> {
        return this.medidasRepository.remove({hora});
      }
}
