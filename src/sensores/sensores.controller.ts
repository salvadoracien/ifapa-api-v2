import {
  Controller,
  Get,
  Param,
  Req,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; 
import { SensoresService } from './sensores.service';
import { Request } from 'express';
import { SensorDto } from './sensor.dto';
import { Sensor } from './sensor.class'; 

@Controller('sensores')
@UseGuards(AuthGuard('jwt')) 
export class SensoresController {
    constructor(private sensoresService: SensoresService) {} 

  @Get()
  findAll(@Req() request: Request): Promise<Sensor[]> {
    console.log(request.query); 
    return this.sensoresService.findAll(request.query); 
  }

  @Get(':sensorId') 
  findSensor(@Param('sensorId') sensorId: string): Promise<Sensor> { 
    return this.sensoresService.findSensor(sensorId); 
  }

  @Post()
  createBook(@Body() newSensor: SensorDto): Promise<Sensor> { 
    return this.sensoresService.createSensor(newSensor);
  }

  @Delete(':sensorId')
  deleteBook(@Param('sensorId') sensorId: string): Promise<Sensor> {
    return this.sensoresService.deleteSensor(sensorId);
  }

  @Put(':sensorId')
  updateBook(
    @Param('sensorId') sensorId: string,
    @Body() newSensor: SensorDto, 
  ): Promise<Sensor> {
    return this.sensoresService.updateBook(sensorId, newSensor);
  }
}
