import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDto } from '../dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, Logger, ConflictException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: UserDto): Promise<User> {
    this.logger.log(`Creating user with username ${createUserDto.username}`);
    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      this.logger.error(`User with ID ${id} not found`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      this.logger.error(`User with username ${username} not found`);
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  async checkSignedUpUser(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });

    if (user) {
      this.logger.error(`User with username ${username} has already been signed up, kindly login`);
      throw new ConflictException(`User with username ${username} has already been signed up, kindly login`);
    }

  }
}
