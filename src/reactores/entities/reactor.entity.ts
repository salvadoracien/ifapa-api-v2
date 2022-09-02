import { Entity, Column, PrimaryColumn, OneToMany, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Sensor } from 'src/sensores/entities/sensor.entity';

@Entity()
export class Reactor {
    @ApiProperty({ example: 1 })
    @PrimaryColumn() 
    idReactor: number;

    @ApiProperty({ example: 'Raceway_1'})
    @Column()
    nombreReactor: string;
    
    @ApiProperty({example : 'Sensor_CO2'})
    @OneToMany( () => Sensor, (sensor : Sensor) => sensor.reactor )
    sensores: Sensor[];
    //Gestionar aqui como le metemos los sensores que lleva cada reactor
}
