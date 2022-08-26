import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Reactor } from 'src/reactores/entities/reactor.entity';
import { Medida } from 'src/medidas/entities/medida.entity'; 


@Entity()
export class Sensor {
  //Aqui falta gestionar como identificamos a cada sensor u_90x_xxxxxx ?¿
  //Cambiar decorador al que permite definir mi clave
  @ApiProperty()
  @PrimaryGeneratedColumn() 
  id: number;

  @ApiProperty({ example: 'SCO2-Raceway_1' }) 
  @Column()
  nombre: string;

  @ApiProperty({ example: 'Sensor para medir el CO2 del reactor...' }) 
  @Column('text')
  description?: string;

  @ApiProperty()
  @ManyToOne(() => Reactor, (reactor : Reactor) => reactor.sensores)
  reactor : Reactor;

  @ApiProperty()
  @OneToMany(() => Medida, (medidas: Medida) => medidas.sensor)
  medidas : Medida[];
}