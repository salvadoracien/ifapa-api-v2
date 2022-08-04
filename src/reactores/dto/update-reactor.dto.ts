import { ApiProperty } from '@nestjs/swagger';

export class UpdateReactorDto {
    @ApiProperty({ example: 'Raceway_1'})
    readonly nombre:  string;
}
