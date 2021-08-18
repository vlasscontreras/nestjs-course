import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { genSaltSync, hash } from 'bcrypt';
import { SignInCredentialsDto } from '@/auth/dto/sign-in-credentials.dto';
import { User } from '@/auth/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(signincredentialsDto: SignInCredentialsDto): Promise<void> {
    const { username, password } = signincredentialsDto;

    // Hashing the password
    const salt = genSaltSync();
    const hashedPassword = await hash(password, salt);

    const user = this.create({
      username: username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('username already exists');
      }

      throw new InternalServerErrorException();
    }
  }
}
