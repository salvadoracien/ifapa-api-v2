import { Medida } from "src/medidas/entities/medida.entity";
import { Reactor } from "src/reactores/entities/reactor.entity";

export class Sensor {
    idSensor: number;
    nombreSensor: string;
    reactor : Reactor; 
    medidas : Medida[]
  }