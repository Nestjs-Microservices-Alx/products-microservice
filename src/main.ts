import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  /* // const app = await NestFactory.create(AppModule); // only RESTful */

  // // envs
  const PORT = envs.PORT;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP, // para el 1er ejemplo con el MessagePattern(emito y espero respuesta)
      options: {
        port: PORT,
      },
    },
  );

  // // logger ------------
  const logger = new Logger('MAIN');

  /*   // // set global prefix ------------
  // app.setGlobalPrefix('api'); // only RESTful */

  // // set global pipes ------------
  app.useGlobalPipes(
    // validate DTOs
    new ValidationPipe({
      whitelist: true, // remueve extra data of DTO - like Mongoose ODM
      // forbidNonWhitelisted: true, // envia 1 error con las properties q NO estan definidas en DTO
    }),
  );

  /*   // await app.listen(PORT); // only RESTful
  // logger.log(`App is running on port ${PORT}`); // only RESTful */

  // microservices
  await app.listen();
  logger.log(`Product Microservice is running on port ${PORT}`);
}
bootstrap();
