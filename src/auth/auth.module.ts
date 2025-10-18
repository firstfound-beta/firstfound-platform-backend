import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 👈 ensures .env is loaded globally
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('EXPIRES_IN') || '24h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
