import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../admin/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authservice: AuthService

  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() datosDto: LoginAuthDto) {
    return this.authservice.funLogin(datosDto);
  }

   @UseGuards(AuthGuard)
    @Get("/profile")
    funPefil(@Request() req) {
        return req.user;
    }

  @Post("/register")
    funRegistrarusuario(@Body() userObj: RegisterAuthDto){
        return this.authservice.funRegister(userObj);
    }


}
