import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Inject } from '@nestjs/common';
import { ReactoresService } from './reactores.service';
import { CreateReactorDto } from './dto/create-reactor.dto';
import { UpdateReactorDto } from './dto/update-reactor.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('reactores')
@ApiTags('reactor')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')

export class ReactoresController {
  
  constructor(private readonly reactoresService: ReactoresService, 
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  @Post()
  create(@Body() createReactorDto: CreateReactorDto) {
    return this.reactoresService.create(createReactorDto);
  }

  @Get('all')
  findAll() {
    return this.reactoresService.findAll();
  }

  @Get(':idReactor')
  findOne(@Param('idReactor') idReactor: string) {
    return this.reactoresService.findOne(+idReactor);
  }

  @Patch(':idReactor')
  update(@Param('idReactor') idReactor: string, @Body() updateReactorDto: UpdateReactorDto) {
    return this.reactoresService.update(+idReactor, updateReactorDto);
  }

  @Delete(':idReactor')
  remove(@Param('idReactor') idReactor: string) {
    return this.reactoresService.remove(+idReactor);
  }
}
