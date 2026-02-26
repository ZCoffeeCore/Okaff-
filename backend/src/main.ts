import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3000' });

  //Conexión PostgreSQL
  const dataSource = app.get(DataSource);
  if (dataSource.isInitialized) {
    console.log('✅ POSTGRESQL Conectado correctamente');
  }

  await app.listen(process.env.PORT ?? 3001);
}

void bootstrap();
