import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Sensor } from 'src/sensores/entities/sensor.entity';

@Entity()
export class Medida {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: '001'})
    id: number;

    @ApiProperty({example: '01/01/2001'})
    @Column()
    dia: string;

    @ApiProperty({example: '23:59:59'})
    @Column()
    hora: string;

    @ApiProperty({ example: 99.999})
    @Column()
    valor: number;

    @ManyToOne(() => Sensor, (sensor: Sensor) => sensor.medidas)     
    sensor : Sensor;
    //Aqui ver como metemos el sensor que toma la medida
    //Tambien como 
}