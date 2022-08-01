import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { SensorDto } from './sensor.dto'; 
import { Sensor } from './sensor.entity'; 
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 

@Injectable()
export class SensoresService {

  constructor(
      @InjectRepository(Sensor) private sensoresRepository: Repository<Sensor>, 
  ) {}

  async findAll(params): Promise<Sensor[]> {
    return await this.sensoresRepository.find();
  }

  //Aqui hemos tenido que hacer la conversion de sensorID a numero para poder aplicar el where
  async findSensor(sensorId: string): Promise<Sensor> {
    return await this.sensoresRepository.findOne({ where: { id: Number(sensorId) } }); 
  }

  createSensor(newSensor: SensorDto): Promise<Sensor> {
    return this.sensoresRepository.save(newSensor);
  }

  async deleteSensor(sensorId: string): Promise<any> {
    return await this.sensoresRepository.delete({ id: parseInt(sensorId) });
  }

  async updateSensor(sensorId: string, newSensor: SensorDto): Promise<Sensor> { 
    let toUpdate = await this.sensoresRepository.findOne({ where: { id: Number(sensorId) } }); 
    let updated = Object.assign(toUpdate, newSensor); 
    return this.sensoresRepository.save(updated); 
  }
}