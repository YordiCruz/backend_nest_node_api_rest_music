import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Not, Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, username, password, isActive = false, roleIds = [] } = createUserDto;

    // Validaciones básicas
    const existeuser = await this.userRepository.findOne({
      where: { username },
    });
    if (existeuser)
      throw new BadRequestException(`El username "${username}" ya está en uso`);

    const existeEmail = await this.userRepository.findOne({ where: { email } });
    if (existeEmail)
      throw new BadRequestException(`El email "${email}" ya está en uso`);

    // Si es empleado, debe tener roles
    let roles: Role[] = [];

    if (isActive === true) {
      if (!roleIds.length) {
        throw new BadRequestException(
          `Debe asignar al menos un rol para empleados`,
        );
      }

      roles = await this.roleRepository.find({
        where: { id: In(roleIds) },
      });

      if (roles.length !== roleIds.length) {
        throw new NotFoundException(`Algunos roles no fueron encontrados`);
      }
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Crear y guardar usuario
    const user = this.userRepository.create({
      username,
      email,
      password: passwordHash,
      isActive: isActive,
      roles,
    });

    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  
    findOneByEmail(email: string) {
      return this.userRepository.findOneBy({ email });
    }

   async replaceRoleInUser(id: string, removeId: string, addId: string) {
  const user = await this.userRepository.findOne({
    where: { id: id },
    relations: ['roles'],
  });

  if (!user) throw new NotFoundException('Rol no encontrado');

  const currentIds = user.roles.map(p => p.id);

  // Verifica que el permiso a eliminar exista en el rol
  if (!currentIds.includes(removeId)) {
    throw new NotFoundException('El rol a eliminar no está asignado al usuario');
  }

  // Filtra el permiso que se quiere quitar
  const updatedRoles = user.roles.filter(p => p.id !== removeId);

  // Obtiene el nuevo permiso a agregar
  const newRole = await this.roleRepository.findOne({
    where: { id: addId },
  });

  if (!newRole) throw new NotFoundException('El nuevo rol no existe');

  // Agrega el nuevo rol
  updatedRoles.push(newRole);

  user.roles = updatedRoles;

  return this.userRepository.save(user);
}



  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`El usuario #${id} no encontrado`);
    }
    return user;
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

  async removeRoleFromUser(user_id: string, roleIds: string[]) {
  const user = await this.userRepository.findOne({
    where: { id: user_id },
    relations: ['roles'],
  });

  if (!user) {
    throw new NotFoundException('usuario no encontrado');
  }

  const currentRoleIds = user.roles.map(p => p.id);
  const remainingRole = user.roles.filter(
    p => !roleIds.includes(p.id),
  );

  if (currentRoleIds.length === remainingRole.length) {
    throw new ConflictException('Ninguno de los roles especificados está asignado al usuario');
  }

  user.roles = remainingRole;
  await this.userRepository.save(user);

  return {
    mensaje: 'Permisos eliminados correctamente del rol',
    eliminados: roleIds.filter(id => currentRoleIds.includes(id)),
    permisos_Restantes: remainingRole.map(p => p.nombre),
  };
}



}
