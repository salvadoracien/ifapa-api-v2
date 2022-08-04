import { ApiProperty } from '@nestjs/swagger';

export class CreateReactorDto {
    @ApiProperty({ example: 'Raceway_1'})
    readonly nombre:  string;
}
