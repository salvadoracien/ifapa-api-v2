import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReactoresService } from './reactores.service';
import { CreateReactorDto } from './dto/create-reactor.dto';
import { UpdateReactorDto } from './dto/update-reactor.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('reactores')
@ApiTags('reactor')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')

export class ReactoresController {
  constructor(private readonly reactoresService: ReactoresService) {}

  @Post(':csv_path')
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
