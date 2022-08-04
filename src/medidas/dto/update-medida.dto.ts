import { ApiProperty } from '@nestjs/swagger';

export class UpdateMedidaDto {
  @ApiProperty({ example: 99.999 })
  readonly valor: number;
}