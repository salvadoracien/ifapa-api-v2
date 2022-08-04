import { ApiProperty } from '@nestjs/swagger';

export class CreateMedidaDto {
  @ApiProperty({ example: 99.999 })
  readonly valor: number;
}