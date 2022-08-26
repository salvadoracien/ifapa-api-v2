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
    SensoresModule,
    ReactoresModule,
    MedidasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 