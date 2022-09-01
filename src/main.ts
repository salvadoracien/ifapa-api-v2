import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configurar títulos de documnentación
  const options = new DocumentBuilder() 
    .setTitle('IFAPA REST API 2022')
    .setDescription('Proyecto de TFG sobre una API Rest para el IFAPA. Versión 0.1 - 24/08/22')
    .setVersion('0.1')
    .addBearerAuth( 
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token', 
    )
    .build();
  const document = SwaggerModule.createDocument(app, options); 
  // La ruta en que se sirve la documentación
  SwaggerModule.setup('docs', app, document); 
  await app.listen(3000);
}
bootstrap();
