/* eslint-disable @typescript-eslint/no-unused-vars */
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    this.logger.log('Validating user....');
    const user = await this.usersService.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;

      this.logger.log('User validation successfully');
      return result;
    }

    return null;
  }

  async login(user: User) {
    const loggedUser = await this.usersService.findByUsername(user.username);
    this.logger.log('Logging-in user....');

    const payload = { username: loggedUser.username, sub: loggedUser.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
      }),
    };
  }

  async signup(username: string, userPassword: string) {
    await this.usersService.checkSignedUpUser(username);
    this.logger.log('Signing-up user....');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    const user = await this.usersService.create({
      username,
      password: hashedPassword,
    });

    const { password, ...result } = user;
    return result;
  }
}
