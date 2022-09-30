import {
  Req,
  Res,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Inject
} from '@nestjs/common';
import { MedidasService } from './medidas.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { Medida } from './entities/medida.entity';
import { CreateMedidaDto } from './dto/create-medida.dto';
import { UpdateMedidaDto } from './dto/update-medida.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Request } from 'express';
import { Between } from 'typeorm';

@Controller('medidas')
@ApiTags('medidas')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')

export class MedidasController {
  constructor(private readonly medidasService: MedidasService, 
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

  //Hay que pensar si se crea la medida directamente o 1º se toma info de la BD
  @Post()
  @ApiOperation({ summary: 'Crear una medida' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Datos de la medida creada',
    type: Medida,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Req() request: Request,
    @Body() newMedida: CreateMedidaDto,
    @Res() res,
  ): Promise<Medida> {
    let startTime = Date.now();
    let data = await this.medidasService.create(newMedida);

    this.writeLog(startTime, request, HttpStatus.CREATED);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'OK',
      data: data,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Obtener una lista de todas las medidas' })
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'Lista de medidas',
    type: [Medida],
  })
  async findAll(@Req() request: Request, @Res() res): Promise<Request[]> { 
    let startTime = Date.now(); 
    let data = await this.medidasService.findAll(request.query); 
    this.writeLog(startTime, request, HttpStatus.OK);
    return res.status(HttpStatus.OK) 
    .json({ 
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: data,
    });
  }

  //Lógica de operaciones prob. incorrecta tomar valor solo no toda la medida
  @Get(':idMedida')
  @ApiOperation({ summary: 'Devuelve una medida en concreto' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Datos de la medida (?)',
    type: Medida,
  })
  async findOne(
    @Req() request: Request,
    @Param('idMedida') idMedida: number,
    @Res() res,
  ): Promise<Medida> {
    let message = 'OK';
    let startTime = Date.now();
    let data = await this.medidasService.findOne(idMedida);
    if (!data) {
      message = 'No se ha encontrado ninguna medida para el id proporcionado';
    }
    this.writeLog(startTime, request, HttpStatus.OK);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: message,
      data: data,
    });
  }

  @Get('timestamp')
  @ApiOperation({ summary: 'Devuelve la medida para un dia en concreto' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Datos de la medida (?)',
    type: Medida,
  })
  async findFecha(
    @Req() request: Request,
    @Param('dia') dia: Date,
    @Res() res,
  ): Promise<Medida> {
    let message = 'OK';
    let startTime = Date.now();
    let data = await this.medidasService.findFecha(dia);
    if (!data) {
      message = 'No se ha encontrado ninguna medida para la fecha proporcionada';
    }
    this.writeLog(startTime, request, HttpStatus.OK);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: message,
      data: data,
    });
  }

  //Tampoco tiene mucho sentido este endpoint creo 
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una medida específica' })
  @ApiResponse({
    status: 200,
    description: 'Datos de la medida actualizada',
    type: Medida,
  })
  async update(
    @Req() request: Request,
    @Param('idMedida') idMedida: number,
    @Body() newMedida: UpdateMedidaDto,
    @Res() res,
  ): Promise<Medida> {
    let message = 'OK';
    let startTime = Date.now();
    let data = await this.medidasService.update(idMedida, newMedida);
    if (!data) {
      message = 'No se ha encontrado ninguna medida para el id proporcionado';
    }

    this.writeLog(startTime, request, HttpStatus.OK);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: message,
      data: data,
    });
  }

  //Quizás no sea ni necesario este endpoint
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una medida' })
  @ApiResponse({
    status: 200,
    description: 'Datos de la medida eliminada',
  })
  async delete(
    @Req() request: Request,
    @Param('idMedida') idMedida: number,
    @Res() res,
  ): Promise<Medida> {
    let message = 'OK';
    let startTime = Date.now();
    let data = await this.medidasService.delete(idMedida);

    if (data['affected'] == 0) {
      message = 'No se ha encontrado ninguna medida para el id proporcionado';
      data = data;
    }

    this.writeLog(startTime, request, HttpStatus.OK);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: message,
      data: data,
    });
  }
}
