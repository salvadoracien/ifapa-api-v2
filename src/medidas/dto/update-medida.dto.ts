import { ApiProperty } from '@nestjs/swagger';
import { Sensor } from 'src/sensores/sensor.class';

export class UpdateMedidaDto 
{  
  @ApiProperty({example: '01/01/2001'})
  dia: string;

  @ApiProperty({example: '23:59:59'})
  readonly hora: string;

  @ApiProperty({ example: 99.999})
  readonly valor?: number;

  @ApiProperty({ example: { id: 1 }, type: Sensor }) 
  readonly sensor: Sensor; 
}