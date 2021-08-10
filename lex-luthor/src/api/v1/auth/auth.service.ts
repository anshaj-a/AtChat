import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  JwtPayloadInterface,
  JwtSignUpPayloadInterface,
} from '../auth/jwt/jwt-payload.interface';
import { User } from '../entities/user.entity';
import { UserRepository } from 'src/api/v1/repositories/user.repository';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<any> {
    try {
      const result = await this.userRepository.signUp(signUpDto); // returns this.userRepository.signUp(signUpDto)

      const payload: JwtSignUpPayloadInterface = result;
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } catch (error) {
      if (error.status === 409) {
        throw new ConflictException('This username is already taken! 😿');
      }
      throw new InternalServerErrorException('Error signing up!');
    }
  }

  async logIn(logInDto: LogInDto): Promise<any> {
    const result = await this.userRepository.logIn(logInDto);

    if (!result) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload: JwtPayloadInterface = result; // const payload: JwtPayloadInterface = result;
    const accessToken = await this.jwtService.sign(payload); // const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
