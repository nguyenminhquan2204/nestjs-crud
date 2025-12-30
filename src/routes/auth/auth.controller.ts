import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBodyDTO, LoginResDTO, LogoutBodyDTO, LogoutResDTO, RefreshTokenBodyDTO, RefreshTokenResDTO, RegisterBodyDTO, RegisterResDTO } from './auth.dto';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('register')
   // @SerializeOptions({ type: RegisterResDTO })
   async register(@Body() body: RegisterBodyDTO) {
      // console.log('controller ...');
      return new RegisterResDTO(await this.authService.register(body));
   }

   @Post('login')
   async login(@Body() body: LoginBodyDTO) {
      // return await this.authService.login(body);
      return new LoginResDTO(await this.authService.login(body));
   }

   @Post('refresh-token')
   @UseGuards(AccessTokenGuard)
   @HttpCode(HttpStatus.OK)
   async refreshToken(@Body() body: RefreshTokenBodyDTO) {
      return new RefreshTokenResDTO(await this.authService.refreshToken(body.refreshToken));
   }

   @Post('logout')
   async logout(@Body() body: LogoutBodyDTO) {
      return new LogoutResDTO(await this.authService.logout(body.refreshToken));
   }
}
