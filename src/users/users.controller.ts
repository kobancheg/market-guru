import { Body, Controller, Delete, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { PaginationQuery } from './dto/pagination-query.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 201, type: [User] })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put('/update')
    async updateUser(@Body() updateDto: UpdateUserDto, @Req() req) {
        await this.usersService.updateUserData(updateDto, req.user);
        return 'User data updated successfully';
    }

    @ApiOperation({ summary: 'Delete user' })
    @ApiImplicitQuery({ name: 'id', required: true, type: 'number' })
    @ApiResponse({ status: 201, type: [User] })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete('/delete')
    async deleteUser(@Req() req) {
        await this.usersService.deleteUserData(req.query);
        return 'User deleted successfully';
    }

    @ApiOperation({ summary: 'Get users by parameters' })
    @ApiImplicitQuery({ name: 'user_name', required: false, type: 'string', description: 'search by name' })
    @ApiImplicitQuery({ name: 'email', required: false, type: 'string', description: 'search by email' })
    @ApiImplicitQuery({ name: 'telephone', required: false, type: 'string', description: 'search by telephone' })
    @ApiImplicitQuery({ name: 'is_active', required: false, type: 'boolean', description: 'search by active' })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get()
    getAll(@Query() paginationQuery: PaginationQuery, @Req() req) {
        return this.usersService.getAllUsers(req.query);
    }
}
