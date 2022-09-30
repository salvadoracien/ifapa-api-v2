import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Reactor } from 'src/reactores/entities/reactor.entity';
import { Medida } from 'src/medidas/entities/medida.entity'; 

@Entity()
export class Sensor {
  //Aqui falta gestionar como identificamos a cada sensor u_90x_xxxxxx ?¿
  //Cambiar decorador al que permite definir mi clave
  @ApiProperty()
  @PrimaryColumn([Unique, true])
  idSensor: number;

  @ApiProperty({ example: 'SCO2-Raceway_1' }) 
  @Column([Unique, true])
  nombreSensor: string;

  @ApiProperty()
  @ManyToOne(() => Reactor, (reactor : Reactor) => reactor.sensores)
  reactor : Reactor;

  @ApiProperty()
  @OneToMany(() => Medida, (medidas: Medida) => medidas.sensor)
  medidas : Medida[];
}