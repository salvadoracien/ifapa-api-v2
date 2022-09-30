import { ApiProperty } from '@nestjs/swagger';
import { Sensor } from 'src/sensores/sensor.class';

export class UpdateMedidaDto 
{  
  @ApiProperty({ example: '235959'})
  readonly medidaId: number;

  @ApiProperty({example: '01/01/2001-00:00:00'})
  timestamp?: Date;

  @ApiProperty({example : 'Temperatura (ºC)'})
  tipoDato? : string;

  @ApiProperty({ example: 99.999})
  valor?: string;

  @ApiProperty({ example: { id: 1 }, type: Sensor }) 
  sensor: Sensor; 
}