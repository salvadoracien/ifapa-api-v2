import { Injectable} from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto'; 
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { Sensor } from './entities/sensor.entity'; 
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 

@Injectable()
export class SensoresService {

  constructor(
      @InjectRepository(Sensor) 
      private sensoresRepository: Repository<Sensor>, 
  ) {}

  async findAll(params): Promise<Sensor[]> {
    return await this.sensoresRepository.find();
  }

 async findOne(id: number): Promise<Sensor> {
    return await this.sensoresRepository.findOne({ where: { id } }); 
  }

  create(newSensor: CreateSensorDto): Promise<Sensor> {
    return this.sensoresRepository.save(newSensor);
  }

  async delete(id: number): Promise<Sensor> {
    return await this.sensoresRepository.remove({id});
  }

  async update(id: number, newSensor: UpdateSensorDto): Promise<Sensor> { 
    let toUpdate = await this.sensoresRepository.findOne({ where: { id } }); 
    let updated = Object.assign(toUpdate, newSensor); 
    return this.sensoresRepository.save(updated); 
  }
}