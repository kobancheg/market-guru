import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface ISearchFilter {
    user_name?: string,
    email?: string,
    telephone?: string,
    is_active?: boolean
}

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async createUser(dto: CreateUserDto) {
        return await this.userRepository.create(dto);
    }

    async getAllUsers(params: { offset: number, limit: number, user_name?: string, email?: string, telephone?: string, is_active?: boolean })
        : Promise<User[]> {

        const searchFilter: ISearchFilter = {};

        if (params.user_name) searchFilter.user_name = params.user_name;
        if (params.email) searchFilter.email = params.email;
        if (params.telephone) searchFilter.telephone = params.telephone;
        if (params.is_active) searchFilter.is_active = params.is_active;

        return await this.userRepository.findAll({
            where: searchFilter, offset: params.offset, limit: params.limit
        });
    }

    async getUserByEmailAndByTelephone(userDto: CreateUserDto) {
        if (userDto.email) return await this.userRepository.findOne({
            where: { email: userDto.email },
            include: { all: true }
        });
        if (userDto.telephone) return await this.userRepository.findOne({
            where: { telephone: userDto.telephone },
            include: { all: true }
        });
    }

    async updateUserData(updateDto: UpdateUserDto, user: User) {

        return await this.userRepository.update({
            user_name: updateDto.user_name ?? user.user_name,
            email: updateDto.email ?? user.email,
            telephone: updateDto.telephone ?? user.telephone
        }, { where: { id: user.id }, returning: true });
    }

    async deleteUserData(param: { id: number }) {

        return await this.userRepository.destroy({
            where: { id: param.id }
        });
    }
}
