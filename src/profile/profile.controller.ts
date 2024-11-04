// src/profile/profile.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard'; // Adjust the import path based on your folder structure

@Controller('profile')
export class ProfileController {
    @Get()
    @UseGuards(AuthGuard)
    getProfile() {
        return { message: 'This is a protected route!' };
    }
}
