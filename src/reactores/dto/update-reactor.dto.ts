import { ApiProperty } from '@nestjs/swagger';
import { Sensor } from 'src/sensores/sensor.class';

export class UpdateReactorDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Raceway_1'})
    nombre?: string;
    
    @ApiProperty({example : 'Sensor_CO2'})
    sensores: Sensor[];
}
