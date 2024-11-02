import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',         
      password: 'Noman@22262',     
      database: 'mobile_booking', 
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,         
      autoLoadEntities: true,    
    }),
    // JwtModule.forRoot({
    //   secret: 'yourSecretKey', // Replace with your actual secret key
    //   signOptions: { expiresIn: '60s' }, // Token expiration time
    // }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
