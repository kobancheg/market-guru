import { ApiProperty } from '@nestjs/swagger';

export class PaginationQuery {
    @ApiProperty({
        minimum: 0,
        maximum: 10000,
        title: 'Offset',
        format: 'int32',
        default: 0
    })
    offset: number;

    @ApiProperty({
        minimum: 0,
        maximum: 10000,
        title: 'Limit',
        format: 'int32',
        default: 0
    })
    limit: number;
}