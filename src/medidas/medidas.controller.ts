import { Controller } from '@nestjs/common';
import { MedidasService } from './medidas.service';

@Controller('medidas')
export class MedidasController {
  constructor(private readonly medidasService: MedidasService) {}
}
