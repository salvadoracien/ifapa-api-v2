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
}
