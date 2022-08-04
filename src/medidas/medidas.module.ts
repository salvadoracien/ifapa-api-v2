import { Module } from '@nestjs/common';
import { MedidasService } from './medidas.service';
import { MedidasController } from './medidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../utilities/auth.module';
import { Medida } from './entities/medida.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Medida]),
  AuthModule],
  controllers: [MedidasController],
  providers: [MedidasService]
})
export class MedidasModule {}
