import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; // Adjust the path based on your structure

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // Inject the User repository
  ) {}

  // Create a new user
  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Find a user by ID
  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  // Update a user
  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.findOne(id); // Return the updated user
  }

  // Remove a user
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
