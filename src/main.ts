import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require('cors');
  const allowedDomains = [
    'https://muze-seven.vercel.app/',
    'http://localhost:19006',
  ];
  const corsOptions = {
    origin: allowedDomains,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  app.use(cookieParser());
  // app.use((req, res, next) => {
  //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:19006');
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  //   );
  //   next();
  // });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3333);
}
bootstrap();
