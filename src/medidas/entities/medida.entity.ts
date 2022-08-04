import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Medida {
    @PrimaryColumn()
    @ApiProperty({ example: '235959'})
    hora: number;

    @ApiProperty({ example: 99.999})
    @Column()
    valor?: number;

    //Aqui ver como metemos el sensor que toma la medida
}