import { Sensor } from "src/sensores/sensor.class";

export class Medida 
{
    id: number;
    dia: string;
    hora: string;
    valor: number;    
    sensor : Sensor;
}