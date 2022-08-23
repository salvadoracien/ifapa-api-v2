import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Reactor } from 'src/reactores/entities/reactor.entity';
import { Medida } from 'src/medidas/entities/medida.entity'; 


@Entity()
export class Sensor {
  //Aqui falta gestionar como identificamos a cada sensor u_90x_xxxxxx ?¿
  //Cambiar decorador al que permite definir mi clave
  @PrimaryColumn() 
  @ApiProperty({ example: 901 })
  id: number;

  @ApiProperty({ example: 'Raceway_1' }) 
  @Column()
  nombre: string;

  @ApiProperty({ example: 'Electroválvula_CO2' }) 
  @Column('text')
  description?: string;

  @ApiProperty({example: 'aaa'})
  @ManyToOne(() => Reactor, (reactor : Reactor) => reactor.sensores)
  reactor : Reactor;

  @OneToMany(() => Medida, (medidas: Medida) => medidas.sensor)
  medidas : Medida[];
}