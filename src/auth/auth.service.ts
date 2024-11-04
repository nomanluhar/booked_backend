import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async signup(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const { email, password } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userService.findOneBy({ email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Validate password length
    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters long');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword, // Set hashed password
    });

    return newUser;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneBy({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      const { password: _, ...userWithoutPassword } = user; // Use user (which has password) to create UserWithoutPassword
      return user; // Return user without password
    }
    return null; // Return null if user not found or password doesn't match
  }

  async login(user: UserWithoutPassword) { // Ensure this receives UserWithoutPassword
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
