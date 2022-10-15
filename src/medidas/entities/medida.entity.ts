import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Sensor } from 'src/sensores/entities/sensor.entity';

@Entity()
export class Medida {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: '001'})
    medidaId: number;

    @ApiProperty({example: '01/01/2001-00:00:00'})
    @Index("IDX_timestamp", { synchronize : false })
    @Column({unique:true, type:'timestamp with time zone'})
    timestamp: Date;

    @ApiProperty({ example : 'Temperatura (ºC)'})
    @Column()
    tipoDato: string;

    @ApiProperty({ example: 99.999})
    @Column()
    valor: string;

    @ApiProperty({type :()=> Sensor})
    @ManyToOne(() => Sensor, (sensor: Sensor) => sensor.medidas)
    sensor : Sensor;
}