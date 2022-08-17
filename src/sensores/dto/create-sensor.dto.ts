import { ApiProperty } from '@nestjs/swagger';
import { Reactor } from 'src/reactores/entities/reactor.entity';

export class CreateSensorDto {
  @ApiProperty({ example: 'Raceway_1' })
  readonly nombre: string;

   @ApiProperty({ example: 'Sensor de CO2' })
   readonly description: string;

   @ApiProperty({ example: { id: 1 } }) 
   readonly reactor : Reactor; 
  }