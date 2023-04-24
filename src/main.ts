import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require('cors');
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3333);
}
bootstrap();
