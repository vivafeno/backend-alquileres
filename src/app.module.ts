import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { OwnersModule } from './owners/owners.module';
import { ClientsModule } from './clients/clients.module';
import { ContractsModule } from './contracts/contracts.module';
import { PropertiesModule } from './properties/properties.module';
import { User } from './auth/entities/user.entity';
import { Client } from './clients/entities/client.entity';
import { Owner } from './owners/entities/owner.entity';
import { Address } from './common/address/entities/address.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule available globally
    }),

    TypeOrmModule.forRoot({      
      type: 'postgres', // type of our database
      host: process.env.DB_HOST, // database host
      port: +process.env.DB_PORT, // database port
      database: process.env.DATABASE, // database name
      username: process.env.DB_USERNAME, // username
      password: process.env.DB_PASSWORD, // user password
      autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
      entities: [User, Owner, Client, Address], // We need to specify the entities we want to load
    }),

    AuthModule,
    CommonModule,
    OwnersModule,
    ClientsModule,
    ContractsModule,
    PropertiesModule,
  ],
})
export class AppModule {}
