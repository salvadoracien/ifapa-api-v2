import { ApiProperty } from '@nestjs/swagger';

export class UpdateSensorDto {
  @ApiProperty({ example: 'Raceway_1' })
  readonly reactor: string;

   @ApiProperty({ example: 'Sensor de CO2' })
   readonly description: string;
  }