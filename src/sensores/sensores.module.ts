import { Module, forwardRef } from '@nestjs/common';
import { Sensor } from './entities/sensor.entity';
import { SensoresService } from './sensores.service';
import { SensoresController } from './sensores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../utilities/auth.module';
import { ReactoresModule } from 'src/reactores/reactores.module';
import { MedidasModule } from 'src/medidas/medidas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sensor]),
    AuthModule,
    forwardRef(() =>ReactoresModule),
    forwardRef(() =>MedidasModule)], 
  providers: [SensoresService], 
  controllers: [SensoresController], 
})
export class SensoresModule {}