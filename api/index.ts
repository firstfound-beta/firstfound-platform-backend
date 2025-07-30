// api/index.ts
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module'; // ✅ Update path if needed
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { Handler } from '@vercel/node';
import { Request, Response } from 'express';

const expressApp = express();
let nestAppReady = false;

// Initialize NestJS app only once
const bootstrap = async () => {
  if (!nestAppReady) {
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    await nestApp.init();
    nestAppReady = true;
  }
};

// Vercel handler
const handler: Handler = async (req: Request, res: Response) => {
  await bootstrap();
  expressApp(req, res); // ✅ THIS is allowed (after init)
};

export default handler;
