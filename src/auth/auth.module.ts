import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.estategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule, // Aquí se importa el módulo de configuración
    TypeOrmModule.forFeature([User]), // Aquí se importan los repositorios necesarios
    PassportModule.register({ defaultStrategy: 'jwt' }),  // Aquí se importa el módulo de Passport
    JwtModule.registerAsync({ // Aquí se importa el módulo de JWT de forma asíncrona
      imports: [ConfigModule], // Aquí se importan los módulos necesarios para el módulo asíncrono
      inject: [ConfigService], // Aquí se inyectan los servicios necesarios para el módulo asíncrono

      // Aquí se define la configuración del módulo asíncrono
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRATION_TIME'),
          },
        };
      },
    }),
  ],

  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
})
// Aquí exportamos el módulo
export class AuthModule {}
