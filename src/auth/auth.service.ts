import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/database/postgres/entity/role.entity';
import { User } from 'src/database/postgres/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role.name,
      },
    };
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role: roleName } = createUserDto;

    // Rechercher le rôle par nom
    const role = await this.userRepository.manager.findOne(Role, {
      where: { name: roleName },
    });

    if (!role) {
      throw new BadRequestException(`Rôle "${roleName}" non trouvé`);
    }

    const user = this.userRepository.create({
      email,
      password,
      roleId: role.id, // Assigner roleId au lieu de l'entité role
    });

    await this.userRepository.save(user);
    return user;
  }
}
