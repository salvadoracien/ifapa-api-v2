import { ApiProperty } from '@nestjs/swagger';
import { Sensor } from 'src/sensores/entities/sensor.entity'

export class CreateMedidaDto {
  @ApiProperty({ example: '235959'})
  readonly id: number;

  @ApiProperty({example: 'Electrovávula_C02'})
  readonly nombre: string;

  @ApiProperty({example: 235959})
  readonly hora: number;

  @ApiProperty({ example: 99.999})
  readonly valor?: number;

  @ApiProperty({ example: { id: 1 }, type: String }) 
  readonly sensor: Sensor; 
}