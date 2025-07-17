import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../permissions/entities/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const { nombre, descripcion, permissionsIds } = createRoleDto;

    const existingRole = await this.roleRepository.findOne({
      where: { nombre },
    });
    if (existingRole) {
      throw new ConflictException('El rol ya existe');
    }

    const role = this.roleRepository.create({
      nombre,
      descripcion,
    });

    return this.roleRepository.save(role);
  }
  async findAll() {
    const roles = await this.roleRepository.find({
      relations: ['permissions'],
    });
    console.log(JSON.stringify(roles, null, 2));
    return roles;
  }

async addPermissions(roleId: string, permissionIds: string[]) {
  const role = await this.roleRepository.findOne({
    where: { id: roleId },
    relations: ['permissions'],
  });

  if (!role) throw new NotFoundException('Rol no encontrado');

  const newPermissions = await this.permissionRepository.find({
    where: { id: In(permissionIds) },
  });

  const currentPermissionIds = role.permissions.map((p) => p.id);

  const alreadyAssigned = newPermissions.filter(p =>
    currentPermissionIds.includes(p.id)
  );

  const toAssign = newPermissions.filter(p =>
    !currentPermissionIds.includes(p.id)
  );

  if (toAssign.length === 0) {
    throw new ConflictException('Todos los permisos ya están asignados');
  }

  role.permissions = [...role.permissions, ...toAssign];

  await this.roleRepository.save(role);

  return {
    mensaje: 'Permisos agregados correctamente',
    agregados: toAssign.map(p => p.nombre),
    ya_existían: alreadyAssigned.map(p => p.nombre),
  };
}

  async replacePermissionInRole(roleId: string, removeId: string, addId: string) {
  const role = await this.roleRepository.findOne({
    where: { id: roleId },
    relations: ['permissions'],
  });

  if (!role) throw new NotFoundException('Rol no encontrado');

  const currentIds = role.permissions.map(p => p.id);

  // Verifica que el permiso a eliminar exista en el rol
  if (!currentIds.includes(removeId)) {
    throw new NotFoundException('El permiso a eliminar no está asignado al rol');
  }

  // Filtra el permiso que se quiere quitar
  const updatedPermissions = role.permissions.filter(p => p.id !== removeId);

  // Obtiene el nuevo permiso a agregar
  const newPermission = await this.permissionRepository.findOne({
    where: { id: addId },
  });

  if (!newPermission) throw new NotFoundException('El nuevo permiso no existe');

  // Agrega el nuevo permiso
  updatedPermissions.push(newPermission);

  role.permissions = updatedPermissions;

  return this.roleRepository.save(role);
}



  async findOne(id: string) {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });

    if (!role) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }

    return role;
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    const { nombre, descripcion } = updateRoleDto;
    return this.roleRepository.update(id, { nombre, descripcion });
  }


  async removePermissionsFromRole(roleId: string, permissionIds: string[]) {
  const role = await this.roleRepository.findOne({
    where: { id: roleId },
    relations: ['permissions'],
  });

  if (!role) {
    throw new NotFoundException('Rol no encontrado');
  }

  const currentPermissionIds = role.permissions.map(p => p.id);
  const remainingPermissions = role.permissions.filter(
    p => !permissionIds.includes(p.id),
  );

  if (currentPermissionIds.length === remainingPermissions.length) {
    throw new ConflictException('Ninguno de los permisos especificados está asignado al rol');
  }

  role.permissions = remainingPermissions;
  await this.roleRepository.save(role);

  return {
    mensaje: 'Permisos eliminados correctamente del rol',
    eliminados: permissionIds.filter(id => currentPermissionIds.includes(id)),
    permisos_Restantes: remainingPermissions.map(p => p.nombre),
  };
}

}
