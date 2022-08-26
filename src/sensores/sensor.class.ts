import { Medida } from "src/medidas/entities/medida.entity";
import { Reactor } from "src/reactores/entities/reactor.entity";

export class Sensor {
    id: number;
    nombre: string;
    description: string;
    reactor : Reactor; 
    medidas : Medida[]
  }