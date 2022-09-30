import { Controller, Get, Post, UploadedFile} from '@nestjs/common';
import { AppService } from './app.service';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { csvModule } from './utilities/csv.module';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    
  }
}
