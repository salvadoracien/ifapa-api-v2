import { ApiProperty } from '@nestjs/swagger';
import { Medida } from 'src/medidas/entities/medida.entity';
import { Reactor } from 'src/reactores/reactor.class';

export class UpdateSensorDto {
  @ApiProperty({ example: 'SCO2-Raceway_1' })
  readonly nombre: string;

   @ApiProperty({ example: 'Sensor de CO2 situado en el reactor...' })
   readonly description: string;

   @ApiProperty({ example: { id: 1 } }) 
   readonly reactor : Reactor;
   
   @ApiProperty({example: { id: 1}})
   readonly medidas : Medida[]
  }