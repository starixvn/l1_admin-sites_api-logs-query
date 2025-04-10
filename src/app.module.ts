import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsModule } from './modules/logs/logs.module';
import { HealthModule } from './modules/health/health.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || '', {
      dbName: process.env.MONGODB_DB_NAME,
    }),
    LogsModule,
    HealthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
