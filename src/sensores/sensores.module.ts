import { Module } from '@nestjs/common';
import { Sensor } from './sensor.entity';
import { SensoresService } from './sensores.service';
import { SensoresController } from './sensores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sensor]),
    ], 
  providers: [SensoresService], 
  controllers: [SensoresController], 
})
export class SensoresModule {}