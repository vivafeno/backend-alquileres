import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: process.env.DB_HOST, // database host
      port: +process.env.DB_PORT, // database port
      database: process.env.DATABASE, // database name
      username: process.env.DB_USERNAME, // username
      password: process.env.DB_PASSWORD, // user password
      autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),

    AuthModule,

  ],
})
export class AppModule {}
