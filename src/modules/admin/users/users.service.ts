import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const {email, username, ...rest } = createUserDto;

    //Verificar si ya existe el username
    const existeuser = await this.userRepository.findOne({where: {username}});

    if (existeuser) {
      throw new BadRequestException(`El username "${username}" ya esta en uso`);
    }

    //Verificar si ya existe el email
    const existeEmail = await this.userRepository.findOne({where: {email}});

    if (existeEmail) {
      throw new BadRequestException(`El email "${email}" ya esta en uso`);
    }

    const newuser = this.userRepository.create({
      username, 
      email,
      ...rest
    });

    return this.userRepository.save(newuser);

  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({id});

    if (!user) {
      throw new NotFoundException(`El usuario #${id} no encontrado`);
    }
    return user;;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`El usuario #${id} no encontrado`);
    }
  }
}
