import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    // Inyectamos el repositorio de usuarios y el servicio de configuración
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        configService: ConfigService,
    ) {
        // Configuramos la estrategia de Passport
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

  async validate(payload: JwtPayload): Promise<User> {

    // EXTRAER EL EMAIL DEL PAYLOAD
    const { id } = payload;
    // BUSCAR EL USUARIO POR EL EMAIL
    const user = await this.userRepository.findOneBy ({ id });

    // SI NO EXISTE EL USUARIO O NO ESTÁ ACTIVO LANZAMOS UNA EXCEPCIÓN
    if (!user) throw new UnauthorizedException('Invalid token...');

    // SI EL USUARIO NO ESTÁ ACTIVO LANZAMOS UNA EXCEPCIÓN
    if (!user.isActive) throw new UnauthorizedException('Inactive user...');

    // AÑADIR A LA REQUEST EL USUARIO PARA TENERLO EN TODO MOMENTO
    return user;
  }
}