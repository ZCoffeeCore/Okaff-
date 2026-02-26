import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGO_URI ??
        (() => {
          throw new Error('MONGO_URI no definida en .env');
        })(),
    ),
    ItemsModule,
  ],
})
export class AppModule {}
