import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
  Inject, 
  Req,
  Res
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; 
import { HttpStatus } from '@nestjs/common';
import { SensoresService } from './sensores.service';
import { UpdateSensorDto }  from './dto/update-sensor.dto'
import { CreateSensorDto } from './dto/create-sensor.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Sensor } from './entities/sensor.entity';
import { Request } from 'express';

@Controller('sensores')
@ApiTags('sensor')
@UseGuards(AuthGuard('jwt')) 
@ApiBearerAuth('access-token')

export class SensoresController {
  constructor(private sensoresService: SensoresService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {} 

  writeLog(startTime: any, request: any, statusCode: number) {
    let finishTime = Date.now();
    let elapsedTime = finishTime - startTime;
  
    this.logger.log({
      level: 'info',
      message: '',
      statusCode: statusCode,
      method: request['method'],
      url: request['url'],
      user: request['user'].username,
      duration: elapsedTime,
    });
  }
    
  @Post()
  @ApiOperation({ summary: 'Crear un sensor' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Datos del sensor creado',
    type: Sensor,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Req() request: Request,
    @Body() newSensor: CreateSensorDto,
    @Res() res,
  ): Promise<Sensor> {
    let startTime = Date.now();
    let data = await this.sensoresService.create(newSensor);

    this.writeLog(startTime, request, HttpStatus.CREATED);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'OK',
      data: data,
    });
  }
  
  @Get()
  @ApiOperation({ summary: 'Obtener lista de sensores' })
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'Lista de Sensores',
    type: [Sensor],
  })
  async findAll(@Req() request: Request, @Res() res): Promise<Sensor[]> { 
    let startTime = Date.now(); 
    let data = await this.sensoresService.findAll(request.query); 
    this.writeLog(startTime, request, HttpStatus.OK);
    return res.status(HttpStatus.OK) 
    .json({ 
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: data,
    });
  }

  @Get(':idSensor') 
  @ApiOperation({ summary: 'Devuelve información sobre un sensor específico' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Datos del sensor',
    type: Sensor,
  })
  async findOne(
    @Req() request: Request,
    @Param('idSensor') idSensor: number,
    @Res() res,
  ): Promise<Sensor> {
    let message = 'OK';
    let startTime = Date.now();
    let data = await this.sensoresService.findOne(idSensor);
    if (!data) {
      message = 'No se ha encontrado ningun sensor con el id proporcionado';
    }
    this.writeLog(startTime, request, HttpStatus.OK);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: message,
      data: data,
    });
  }

  @Delete(':idSensor')
  @ApiOperation({ summary: 'Eliminar un sensor específico' })
  @ApiResponse({
    status: 200,
    description: 'Datos del sensor eliminado',
  })
  async delete(
    @Req() request: Request,
    @Param('idSensor') idSensor: number,
    @Res() res,
  ): Promise<Sensor> {
    let message = 'OK';
    let startTime = Date.now();
    let data = await this.sensoresService.delete(idSensor);

    if (data['affected'] == 0) {
      message = 'No se ha encontrado ningun sensor con el id proporcionado';
      data = data;
    }

    this.writeLog(startTime, request, HttpStatus.OK);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: message,
      data: data,
    });
  }

  @Patch(':idSensor')
  @ApiOperation({ summary: 'Actualizar un sensor específico' })
  @ApiResponse({
    status: 200,
    description: 'Datos del sensor actualizado',
    type: Sensor,
  })
  async update(
    @Req() request: Request,
    @Param('idSensor') idSensor: number,
    @Body() newBook: UpdateSensorDto,
    @Res() res,
  ): Promise<Sensor> {
    let message = 'OK';
    let startTime = Date.now();
    let data = await this.sensoresService.update(idSensor, newBook);
    if (!data) {
      message = 'No se ha encontrado ningun sensor con el id proporcionado';
    }

    this.writeLog(startTime, request, HttpStatus.OK);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: message,
      data: data,
    });
  }
}
