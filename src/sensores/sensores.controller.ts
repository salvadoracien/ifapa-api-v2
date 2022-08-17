import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; 
import { SensoresService } from './sensores.service';
import { UpdateSensorDto }  from './dto/update-sensor.dto'
import { CreateSensorDto } from './dto/create-sensor.dto';
import { Sensor } from './entities/sensor.entity'; 
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('sensores')
@ApiTags('sensor')
@UseGuards(AuthGuard('jwt')) 
@ApiBearerAuth('access-token')

export class SensoresController {
    constructor(private sensoresService: SensoresService) {} 

  @Post()
  create(@Body() createSensorDto: CreateSensorDto) { 
    return this.sensoresService.create(createSensorDto);
  }
  
  @Get()
  async findAll(){
    return this.sensoresService.findAll(''); 
  }

  @Get(':id') 
  async findOne(@Param('id') id: number): Promise<Sensor> { 
    return this.sensoresService.findOne(+id); 
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Sensor> {
    return this.sensoresService.delete(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() newSensor: UpdateSensorDto, 
  ): Promise<Sensor> {
    return this.sensoresService.update(+id, newSensor);
  }
}
