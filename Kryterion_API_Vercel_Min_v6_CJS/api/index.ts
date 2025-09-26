import 'reflect-metadata';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';

let server: Express | null = null;

async function bootstrap(): Promise<Express> {
  const app = express();
  app.use(helmet());
  app.use(cors());
  const nest = await NestFactory.create(AppModule, new ExpressAdapter(app), { logger: false });
  await nest.init();
  console.log('[Vercel] Nest app bootstrapped (CJS v6)');
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!server) server = await bootstrap();
  return server(req, res);
}
