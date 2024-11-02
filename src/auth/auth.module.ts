import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module'; // Import UserModule if you need user access

@Module({
  imports: [
    JwtModule.register({
      secret: 'booking_mobile_devices', // Replace with your actual secret key
      signOptions: { expiresIn: '60s' }, // Token expiration time
    }),
    UserModule, // Import UserModule if needed
  ],
  providers: [AuthService],
  exports: [AuthService], // Export AuthService to use in other modules
})
export class AuthModule {}
