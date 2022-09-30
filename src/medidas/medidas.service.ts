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
    
  async create(createMedidaDto: CreateMedidaDto): Promise<Medida> {
    return this.medidasRepository.save(createMedidaDto);
  }
   
  async findAll(params): Promise<Medida[]> {
    return this.medidasRepository.find();
  }
    
  async findOne(medidaId: number): Promise<Medida> {
    return await this.medidasRepository.findOne({ where: { medidaId }});
  }

  async findFecha(timestamp: Date): Promise<Medida> {
    return await this.medidasRepository.findOne({ where: { timestamp }});
  }
    
  async update(medidaId: number, updateMedidaDto: UpdateMedidaDto) {
    return this.medidasRepository.update(medidaId, updateMedidaDto);
  }
    
  async delete(medidaId: number): Promise<Medida> {
    return this.medidasRepository.delete[medidaId];
  }
}