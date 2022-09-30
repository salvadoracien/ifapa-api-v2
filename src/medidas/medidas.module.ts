import { Module, forwardRef } from '@nestjs/common';
import { MedidasService } from './medidas.service';
import { MedidasController } from './medidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../utilities/auth.module';
import { Medida } from './entities/medida.entity';
import { SensoresModule } from 'src/sensores/sensores.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([Medida]),
  AuthModule,
  forwardRef(() =>SensoresModule)],
  controllers: [MedidasController],
  providers: [MedidasService]
})
export class MedidasModule {}
