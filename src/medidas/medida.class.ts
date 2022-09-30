import { Sensor } from "src/sensores/sensor.class";

export class Medida 
{
    id: number;
    dia: Date;
    valores: [[]];    
    sensor : Sensor;
}