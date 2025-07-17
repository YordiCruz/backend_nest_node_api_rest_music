import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {

  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const {nombre, descripcion, ...rest} = createPermissionDto;
    const permiso = await this.permissionRepository.findOne({where: {nombre}});
    //si existe
    if(permiso) throw new ConflictException('El permiso ya existe');

    const newpermiso = this.permissionRepository.create({...rest, nombre, descripcion});
    return this.permissionRepository.save(newpermiso);

  }

  findAll() {
    return this.permissionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
      const {nombre, descripcion, ...rest} = updatePermissionDto;

      return this.permissionRepository.update(id, {...rest, nombre, descripcion});    
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
