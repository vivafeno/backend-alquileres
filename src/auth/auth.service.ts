import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';

import { Repository } from 'typeorm';
import  * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

  // Inyectamos el repositorio de usuarios
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}


  // Método para crear un usuario nuevo
  async create(createUserDto: CreateUserDto) {
    try {

      // Encriptamos la contraseña
      const {password, ...userData} = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      // Guardamos el usuario en la base de datos
      await this.userRepository.save(user);

      // Retornamos el usuario creado
      delete user.password;
      
      // Retornamos el usuario logueado
      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
    };

    } catch (error) {
      // Manejamos errores de la base de datos
      this.handleDBErrors(error);
    }
  }
  
  // Método para loguear un usuario
  async login(loginUserDto: LoginUserDto) {

    // Extraemos el email y la contraseña del DTO
    const { password, email } = loginUserDto;

    // Buscamos el usuario en la base de datos
    const user = await this.userRepository.findOne({
      where:  { email },
      select: { email: true, password: true, id: true },
     });

    // Verificamos si el usuario existe
    if (!user) throw new UnauthorizedException('Invalid credentials')
    
    // Verificamos si la contraseña es correcta
    if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Invalid credentials');

    // Retornamos el usuario logueado
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  // Método para obtener un usuario por email
  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }

  // Método privado para manejar errores de la base de datos
  private handleDBErrors(error: any) : never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);
    throw new InternalServerErrorException('Server error: Check logs...');
  }
}
