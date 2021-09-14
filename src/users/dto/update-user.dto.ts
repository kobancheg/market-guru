import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ example: 'user_name', description: 'User name' })
    @IsOptional()
    @IsString({ message: 'Only string' })
    @Length(1, 50, { message: 'Not less than 4 and not more than 16 characters' })
    readonly user_name: string;

    @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
    @IsOptional()
    @IsEmail({}, { message: 'Incorrect email' })
    readonly email: string;

    @ApiProperty({ example: '6344445566', description: 'Telephone' })
    @IsOptional()
    @IsString({ message: 'Incorrect telephone' })
    readonly telephone: string;
}