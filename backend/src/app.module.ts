import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'mongoose';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // MongoDB
    MongooseModule.forRoot(process.env.MONGO_URI!, {
      connectionFactory: (connection: Connection) => {
        connection.on('connected', () => {
          console.log('✅ MONGODB Conectado correctamente');
        });
        connection.on('error', (error: Error) => {
          console.error('❌ MONGODB Error de conexión:', error);
        });
        return connection;
      },
    }),

    // PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.PG_URI,
      autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),

    ItemsModule,
  ],
})
export class AppModule {}
