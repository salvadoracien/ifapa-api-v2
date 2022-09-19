import { Req, HttpStatus, Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Inject, Res } from '@nestjs/common';
import { ReactoresService } from './reactores.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Reactor } from 'src/reactores/entities/reactor.entity';
import { CreateReactorDto } from './dto/create-reactor.dto';
import { UpdateReactorDto } from './dto/update-reactor.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Request } from 'express'
import { Logger } from 'winston';

@Controller('reactores')
@ApiTags('reactor')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')

export class ReactoresController {
  constructor(private readonly reactoresService: ReactoresService, 
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
  @ApiOperation({ summary: 'Crear un reactor' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Datos del reactor creado',
    type: Reactor,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Req() request: Request,
    @Body() newReactor: CreateReactorDto,
    @Res() res,
    ): Promise<Reactor> {
      let startTime = Date.now();
      let data = await this.reactoresService.create(newReactor);
  
      this.writeLog(startTime, request, HttpStatus.CREATED);
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'OK',
        data: data,
      });
    }

  @Get()
  @ApiOperation({ summary: 'Obtener una lista de todos los reactores' })
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'Lista de reactores',
    type: [Reactor],
  })
  async findAll(@Req() request: Request, @Res() res): Promise<Reactor[]> { 
    let startTime = Date.now(); 
    let data = await this.reactoresService.findAll(request.query); 
    this.writeLog(startTime, request, HttpStatus.OK);
    return res.status(HttpStatus.OK) 
    .json({ 
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: data,
    });
  }

  @Get(':idReactor')
  @ApiOperation({ summary: 'Devuelve información sobre un reactor específico' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Datos del reactor',
    type: Reactor,
  })
  async findOne(
    @Req() request: Request,
    @Param('idReactor') idReactor: number,
    @Res() res,
  ): Promise<Reactor> {
    let message = 'OK';
    let startTime = Date.now();
    let data = await this.reactoresService.findOne(idReactor);
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

  @Patch(':idReactor')
  @ApiOperation({ summary: 'Actualizar un reactor específico' })
  @ApiResponse({
    status: 200,
    description: 'Datos del reactor actualizado',
    type: Reactor,
  })
  async update(
    @Req() request: Request,
    @Param('idReactor') idReactor: number,
    @Body() newReactor: UpdateReactorDto,
    @Res() res,
  ): Promise<Reactor> {
    let message = 'OK';
    let startTime = Date.now();
    let data = await this.reactoresService.update(idReactor, newReactor);
    if (!data) {
      message = 'No se ha encontrado ningun reactor con el id proporcionado';
    }

    this.writeLog(startTime, request, HttpStatus.OK);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: message,
      data: data,
    });
  }

  @Delete(':idReactor')
  @ApiOperation({ summary: 'Eliminar un reactor específico' })
  @ApiResponse({
    status: 200,
    description: 'Datos del reactor eliminado',
  })
  async delete(
    @Req() request: Request,
    @Param('idReactor') idReactor: number,
    @Res() res,
  ): Promise<Reactor> {
    let message = 'OK';
    let startTime = Date.now();
    let data = await this.reactoresService.delete(idReactor);

    if (data['affected'] == 0) {
      message = 'No se ha encontrado ningun reactor con el id proporcionado';
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
