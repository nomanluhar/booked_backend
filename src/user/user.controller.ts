import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

interface UserResponse {
    message: string;
    data: User[]
}

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('signup')
    async register(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
        return this.userService.create(createUserDto);
    }

    // Get all users
    @Get()
    async findAll(): Promise<UserResponse> {
        const users = await this.userService.findAll();
        if (users.length === 0) {
            return {
                message: 'No users found.',
                data: users,
            };
        }
        return {
            message: 'Users retrieved successfully.',
            data: users,
        };
    }

    // Get a user by ID
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        return this.userService.findOne(id);
    }

    // Update a user
    @Put(':id')
    async update(@Param('id') id: number, @Body() userData: Partial<User>): Promise<User> {
        return this.userService.update(id, userData);
    }

    // Delete a user
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.userService.remove(id);
    }
}
