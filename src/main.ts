import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

// INICIALIZACIÓN DE LA APLICACIÓN
async function bootstrap() {

  console.log(`Iniciando la aplicación... ${parseInt(process.env.PORT)} `);

  // INICIALIZACIÓN DE NEST
  const app = await NestFactory.create(AppModule);

  // PUERTO DE ESCUCHA
  let currentPort = parseInt(process.env.PORT) || 3000;

  // PREFIJO PARA TODAS LAS RUTAS
  let globalPrefix = process.env.GLOBAL_PREFIX || 'api';
  app.setGlobalPrefix(globalPrefix);

  // VALIDACIÓN DE DATOS DE ENTRADA
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // INICIALIZACIÓN DEL SERVIDOR
  await app.listen(currentPort);

  // IDENTIFICADOR MENSAJES EN EL LOG DE NEST. USAR logger.log('MENSAJE')
  const logger = new Logger('MAIN');

  // MENSAJE DE INICIALIZACIÓN
  logger.log(
    `Server running on http://localhost:${currentPort}/${globalPrefix})`,
  );


  // CONFIGURACIÓN DE SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Facturación Alquileres API')
    .setDescription('Descripción API Facturación Alquileres')
    .setVersion('1.0')   
    .build();
  
  // INICIALIZACIÓN DE SWAGGER
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  // SWAGGER
  SwaggerModule.setup('api', app, documentFactory);
}

// INICIALIZACIÓN DE LA APLICACIÓN
bootstrap();
