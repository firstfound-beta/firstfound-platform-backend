// api/index.ts
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express'; // ✅ default import
const expressApp = express();
import { Request, Response } from 'express';
let isReady = false;

async function bootstrap() {
  if (!isReady) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    await app.init();
    isReady = true;
  }
}

export default async function handler(
  req: Request,
  res: Response,
): Promise<void> {
  await bootstrap();
  // Cast to suppress TS error (Express app is callable, but types don't know it)
  return (expressApp as unknown as (req: Request, res: Response) => void)(
    req,
    res,
  );
}
