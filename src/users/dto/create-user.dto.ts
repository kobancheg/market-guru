import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
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
    @IsMobilePhone()
    readonly telephone: string;

    @ApiProperty({ example: '12345', description: 'Password' })
    @IsString({ message: 'Only string' })
    @Length(4, 16, { message: 'Not less than 4 and not more than 16 characters' })
    readonly password: string;
}
