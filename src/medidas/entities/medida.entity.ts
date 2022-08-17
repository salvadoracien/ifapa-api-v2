import { Entity, Column, PrimaryColumn, ManyToOne} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Sensor } from 'src/sensores/entities/sensor.entity';

@Entity()
export class Medida {
    @PrimaryColumn()
    @ApiProperty({ example: '235959'})
    id: number;

    @ApiProperty({example: 'Electrovávula_C02'})
    @Column()
    nombre: string;

    @ApiProperty({example: 235959})
    @Column()
    hora: number;

    @ApiProperty({ example: 99.999})
    @Column()
    valor?: number;

    @ManyToOne(() => Sensor, (sensor: Sensor) => sensor.medidas)     
    sensor : Sensor;
    //Aqui ver como metemos el sensor que toma la medida
}