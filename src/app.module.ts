import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsModule } from './modules/logs/logs.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017',
      {
        dbName: process.env.MONGODB_DB_NAME || 'logs',
        retryWrites: true,
        w: 'majority',
      },
    ),
    LogsModule,
    HealthModule,
  ],
})
export class AppModule {}
