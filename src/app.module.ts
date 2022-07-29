import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensoresModule } from './sensores/sensores.module';
import { configService } from './config/config/config.service';

@Module({
  imports: [
    SensoresModule,
    TypeOrmModule.forRoot(
      configService.getTypeOrmConfig()
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
