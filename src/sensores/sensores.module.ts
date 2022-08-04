import { Module } from '@nestjs/common';
import { Sensor } from './entities/sensor.entity';
import { SensoresService } from './sensores.service';
import { SensoresController } from './sensores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../utilities/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sensor]),
    AuthModule], 
  providers: [SensoresService], 
  controllers: [SensoresController], 
})
export class SensoresModule {}