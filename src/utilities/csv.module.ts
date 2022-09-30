import {extname, join} from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class csvModule {
    //Para confirmar que nos pasan .csv
    csvFileFilter = (req, file, callback) => {
        if (!file.originalname.match(/\.(csv)$/)) {
            return callback(new Error('Solo se permiten archivos ".csv"'), false);
        }
    callback(null, true);
    };

    //Obtener el nombre del archivo
    csvFileName = (req, file, callback) => {
        const fileExtName = extname(file.originalname);
        callback(null, `data${fileExtName}`);
    };

    //Obtener la ruta del archivo 
    getCSVFile = () => {
        const filePath = join(__dirname, "..", "..", "uploads/csv", "data.csv");
        return filePath;
    };

    //(?)
    editFileName = (req, file, callback) => {
        const name = file.originalname.split('.')[0];
        const fileExtName = extname(file.originalname);
        const randomName = Array(4).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
        callback(null, `${name}-${randomName}${fileExtName}`);
    };
}