import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBodyDTO, LoginResDTO, RegisterBodyDTO, RegisterResDTO } from './auth.dto';

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
}
