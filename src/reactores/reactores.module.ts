import { Module, forwardRef } from '@nestjs/common';
import { ReactoresService } from './reactores.service';
import { ReactoresController } from './reactores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reactor} from './entities/reactor.entity';
import { AuthModule } from '../utilities/auth.module';
import { SensoresModule } from 'src/sensores/sensores.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reactor]), 
    AuthModule,
    forwardRef(() =>SensoresModule)],
  controllers: [ReactoresController],
  providers: [ReactoresService]
})
export class ReactoresModule {}
