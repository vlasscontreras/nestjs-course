import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { SignInCredentialsDto } from '@/auth/dto/sign-in-credentials.dto';
import { SignUpCredentialsDto } from '@/auth/dto/sign-up-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpCredentialsDto: SignUpCredentialsDto): Promise<any> {
    return this.authService.signUp(signUpCredentialsDto);
  }

  @Post('signin')
  signIn(
    @Body() signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInCredentialsDto);
  }
}
