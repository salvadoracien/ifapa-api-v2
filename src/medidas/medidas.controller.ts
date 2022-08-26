import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MedidasService } from './medidas.service';
import { CreateMedidaDto } from './dto/create-medida.dto';
import { UpdateMedidaDto } from './dto/update-medida.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@Controller('medidas')
@ApiTags('medidas')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')

export class MedidasController {
  constructor(private readonly medidasService: MedidasService) {}

  @Post()
  create(@Body() createMedidaDto: CreateMedidaDto) {
    return this.medidasService.create(createMedidaDto);
  }

  @Get()
  findAll() {
    return this.medidasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medidasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedidaDto: UpdateMedidaDto) {
    return this.medidasService.update(+id, updateMedidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medidasService.delete(+id);
  }
}
