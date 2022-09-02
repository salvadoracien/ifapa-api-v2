import { ApiProperty } from '@nestjs/swagger';
import { Sensor } from 'src/sensores/sensor.class';

export class UpdateReactorDto {
    @ApiProperty({ example: 1 })
    idReactor: number;

    @ApiProperty({ example: 'Raceway_1'})
    nombreReactor: string;
    
    @ApiProperty({example : 'Sensor_CO2'})
    sensores: Sensor[];
}
