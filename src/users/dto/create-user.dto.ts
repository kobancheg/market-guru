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

    @ApiProperty({ example: '+7-8634 444 55 66', description: 'Почта' })
    @IsOptional()
    @IsMobilePhone()
    readonly telephone: string;

    @ApiProperty({ example: '12345', description: 'пароль' })
    @IsString({ message: 'Only string' })
    @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
    readonly password: string;
}
