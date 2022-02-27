import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../typings';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(201)
  @Post('/signup')
  async signup(@Body() dto: AuthDto, @Headers('Content-Type') type: string) {
    if (type !== 'application/json')
      return new BadRequestException('Bad data type');

    return this.authService.signup(dto);
  }

  @HttpCode(202)
  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
