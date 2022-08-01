import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sensor {
  //Aqui falta gestionar como identificamos a cada sensor u_90x_xxxxxx ?¿
  //Cambiar decorador al que permite definir mi clave
  @PrimaryGeneratedColumn() 
  id: number;

  @Column()
  reactor: string;

  @Column('text')
  description: string;
}