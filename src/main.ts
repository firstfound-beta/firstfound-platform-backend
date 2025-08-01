import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://firstfound-platform-frontend.vercel.app',
      'http://localhost:5173',
    ],
    credentials: true,
  });

  // Swagger setup (optional)
  const config = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
