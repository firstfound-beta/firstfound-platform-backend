// api/index.ts
import 'reflect-metadata'; // ✅ required for NestJS
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

let isInitialized = false;

const bootstrap = async () => {
  if (!isInitialized) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    await app.init();
    isInitialized = true;
  }
};

export default async function handler(req, res) {
  try {
    await bootstrap();
    server(req, res); // pass request to express/Nest app
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).send('Internal Server Error');
  }
}
