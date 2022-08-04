import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Reactor {
    @ApiProperty({ example: 091 })
    @PrimaryColumn() 
    id: number;

    @ApiProperty({ example: 'Raceway_1'})
    @Column()
    nombre?: string;

    //Gestionar aqui como le metemos los sensores que lleva cada reactor
}
