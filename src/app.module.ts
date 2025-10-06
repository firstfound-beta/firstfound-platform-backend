import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StartupModule } from './startup/startup.module';
import { ProductsModule } from './featureProducts/featureProducts.module';
import { CampaignBuilderModule } from './campaign-builder/campaign-builder.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    StartupModule,
    ProductsModule,
    CampaignBuilderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
