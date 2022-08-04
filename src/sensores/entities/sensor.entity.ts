import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Sensor {
  //Aqui falta gestionar como identificamos a cada sensor u_90x_xxxxxx ?¿
  //Cambiar decorador al que permite definir mi clave
  @PrimaryColumn() 
  @ApiProperty({ example: 901 })
  id: number;

  @ApiProperty({ example: 'Raceway_1' }) 
  @Column()
  reactor?: string;

  @ApiProperty({ example: 'Electroválvula_CO2' }) 
  @Column('text')
  description?: string;

  //Aqui gestionar medidas, una o varias?¿
  //Añadir otra columna mas como una lista de medidas 
}