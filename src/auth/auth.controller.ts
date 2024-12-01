import { Controller, Get, Post, Body, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser, RawHeaders, RoleProtected} from './decorators';
import { User } from './entities/user.entity';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { META_ROLES } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { ValidatePromise } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
    @Headers() headers: IncomingHttpHeaders,
    @RawHeaders() rawHeaders: string[],
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
  ){   
    return {
      ok: true,
      msg: 'This is a private route, only for authenticated users',
      user,
      userEmail,
      rawHeaders,
      headers,
    };
  }



  @Get('private2')
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute2(
    @GetUser() user: User,
  ){
    return {
      ok: true,     
      user,
    };
  }


  @Get('private3')  
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  privateRoute3(
    @GetUser() user: User,
    
  ){
      return {
      ok: true,     
      user,
    };
  }




}
