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
    
      async findOne(id: number): Promise<Medida> {
        return await this.medidasRepository.findOne({ where: { id }});
      }
    
      async update(id: number, updateMedidaDto: UpdateMedidaDto) {
        return this.medidasRepository.update(id, updateMedidaDto);
      }
    
      async delete(id: number): Promise<Medida> {
        return this.medidasRepository.delete[id];
      }
}
