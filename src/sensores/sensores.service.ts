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

  async create(newSensor: CreateSensorDto): Promise<Sensor> {
    return this.sensoresRepository.save(newSensor);
  }
  
  async findAll(params): Promise<Sensor[]> {
    return await this.sensoresRepository.find({ relations: ['reactor', 'medidas'] });
  }

  async findOne(idSensor: number): Promise<Sensor> {
    return await this.sensoresRepository.findOne({ 
      where: { idSensor },
      relations: ['reactor', 'medidas']
    }); 
  }
  
  async delete(idSensor: number): Promise<Sensor> {
    return await this.sensoresRepository.remove[idSensor];
  }

  async update(idSensor: number, newSensor: UpdateSensorDto): Promise<Sensor> { 
    let toUpdate = await this.sensoresRepository.findOne({ where: { idSensor } }); 
    let updated = Object.assign(toUpdate, newSensor); 
    return this.sensoresRepository.save(updated); 
  }
}