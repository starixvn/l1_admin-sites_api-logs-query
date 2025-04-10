import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('API Logs Query')
    .setDescription('API for querying game logs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Use environment variables
  const host = process.env.HOSTNAME || '0.0.0.0';
  const port = process.env.PORT || 5000;

  await app.listen(port, host);
  console.log(`Application is running on: ${host}:${port}`);
}
bootstrap();
