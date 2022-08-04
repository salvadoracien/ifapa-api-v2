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

  @Post()
  create(@Body() createReactoreDto: CreateReactorDto) {
    return this.reactoresService.create(createReactoreDto);
  }

  @Get()
  findAll() {
    return this.reactoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reactoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReactoreDto: UpdateReactorDto) {
    return this.reactoresService.update(+id, updateReactoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reactoresService.remove(+id);
  }
}
