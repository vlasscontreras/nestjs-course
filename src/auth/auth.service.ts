import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare as hashCompare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInCredentialsDto } from '@/auth/dto/sign-in-credentials.dto';
import { SignUpCredentialsDto } from '@/auth/dto/sign-up-credentials.dto';
import { UsersRepository } from '@/auth/users.repository';
import { JwtPayload } from '@/auth/jwt.payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username } = signUpCredentialsDto;
    const payload: JwtPayload = { username };

    this.usersRepository.createUser(signUpCredentialsDto);

    return { accessToken: this.jwtService.sign(payload) };
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = signInCredentialsDto;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await hashCompare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);

      return { accessToken };
    }

    throw new UnprocessableEntityException('invalid credentials');
  }
}
