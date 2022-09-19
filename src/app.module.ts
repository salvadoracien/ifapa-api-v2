import { WinstonModule } from 'nest-winston'; 
import * as winston from 'winston';
import * as path from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensoresModule } from './sensores/sensores.module';
import { configService } from './config/config/config.service';
import { ReactoresModule } from './reactores/reactores.module';
import { MedidasModule } from './medidas/medidas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      configService.getTypeOrmConfig()
    ),
    WinstonModule.forRoot({
      level: 'info', 
      format: winston.format.combine( 
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      transports: [ 
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/debug/'),
          filename: 'debug.log',
          level: 'debug',
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/error/'),
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/info/'),
          filename: 'info.log',
          level: 'info',
        }),
        new winston.transports.Console({ level: 'debug' }),
      ],
    }),
    SensoresModule,
    ReactoresModule,
    MedidasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 