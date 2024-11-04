import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity'; // Adjust the path based on your structure
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

type UserWithoutPassword = Omit<User, 'password'>;


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // Inject the User repository
  ) { }

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const savedUser = await this.userRepository.save(createUserDto);
    // Return the user data without the password
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  // Find a user with dynamic criteria
  async findOneBy(criteria: FindOptionsWhere<User>): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: criteria });

    return user;
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Find a user by ID
  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  // Update a user
  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.findOne(id); // Return the updated user
  }

  // Remove a user
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
