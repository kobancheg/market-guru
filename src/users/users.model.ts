import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsOptional } from 'class-validator';

interface UserCreationAttrs {
    user_name: string;
    email: string;
    telephone: string;
    password: string;
}

@Table({
    tableName: 'users', validate: {
        bothCoordsOrNone(this: User) {
            if ((!this.email) && (!this.telephone)) {
                throw new Error('Either both email and telephone, or neither!');
            }
        }
    }
})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Unique identificator' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'sebastian', description: 'User name' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    user_name: string;

    @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
    @IsOptional()
    @IsEmail()
    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    email: string;

    @ApiProperty({ example: '6344445566', description: 'Telephone number' })
    @IsOptional()
    @IsMobilePhone()
    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    telephone: string;

    @ApiProperty({ example: '12345678', description: 'Password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'true', description: 'Active' })
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    is_active: boolean;
}
