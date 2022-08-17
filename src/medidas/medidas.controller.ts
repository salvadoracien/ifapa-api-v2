import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MedidasService } from './medidas.service';
import { CreateMedidaDto } from './dto/create-medida.dto';
import { UpdateMedidaDto } from './dto/update-medida.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@Controller('medidas')
export class MedidasController {
  constructor(private readonly medidasService: MedidasService) {}
}
