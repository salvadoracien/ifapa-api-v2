import { ApiProperty } from '@nestjs/swagger';
import { Sensor } from 'src/sensores/entities/sensor.entity'

export class CreateMedidaDto 
{
  @ApiProperty({ example: '235959'})
  readonly id: number;

  @ApiProperty({example: '01/01/2001'})
  dia: string;

  @ApiProperty({example: '23:59:59'})
  readonly hora: string;

  @ApiProperty({ example: 99.999})
  readonly valor?: number;

  @ApiProperty({ example: { id: 1 }, type: Sensor }) 
  readonly sensor: Sensor; 
}