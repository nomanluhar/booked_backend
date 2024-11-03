import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]) // Register User entity here to enable injection
      ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService], // Make sure UserService is exported
})
export class UserModule { }
