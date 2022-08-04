import { Module } from '@nestjs/common';
import { ReactoresService } from './reactores.service';
import { ReactoresController } from './reactores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reactor} from './entities/reactor.entity';
import { AuthModule } from '../utilities/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reactor]), 
    AuthModule],
  controllers: [ReactoresController],
  providers: [ReactoresService]
})
export class ReactoresModule {}
