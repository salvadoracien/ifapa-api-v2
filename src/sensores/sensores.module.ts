import { Module } from '@nestjs/common';
import { SensoresService } from './sensores.service';
import { SensoresController } from './sensores.controller';

@Module({
  imports: [
    SensoresModule, 
    ], 
  providers: [SensoresService], 
  controllers: [SensoresController], 
})
export class SensoresModule {}