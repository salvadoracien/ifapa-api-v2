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

  @Get(':idSensor') 
  async findOne(@Param('idSensor') idSensor: number) { 
    return this.sensoresService.findOne(+idSensor); 
  }

  @Delete(':idSensor')
  async delete(@Param('idSensor') idSensor: number) {
    return this.sensoresService.delete(+idSensor);
  }

  @Patch(':idSensor')
  async update(
    @Param('idSensor') idSensor: number,
    @Body() newSensor: UpdateSensorDto, 
  ) {
    return this.sensoresService.update(+idSensor, newSensor);
  }
}
