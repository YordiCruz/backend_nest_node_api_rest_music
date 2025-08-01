import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignPermissionsDto } from './dto/asignar_role.dto';
import { UpdateRolePermissionsDto } from './dto/actualizar_permisos_role.dto';
import { RemovePermissionsDto } from './dto/eliminar_permiso.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  
@Patch(':id/permissions/add')
addPermissionsToRole(
  @Param('id') id: string,
  @Body() dto: AssignPermissionsDto,
) {
  return this.roleService.addPermissions(id, dto.permissionIds);
}




@Patch(':id/permissions/replace')
replacePermission(
  @Param('id') id: string,
  @Body() body: { removeId: string; addId: string }
) {
  return this.roleService.replacePermissionInRole(id, body.removeId, body.addId);
}



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }


@Patch(':id/permissions/remove')
removePermissionsFromRole(
  @Param('id') id: string,
  @Body() dto: RemovePermissionsDto,
) {
  return this.roleService.removePermissionsFromRole(id, dto.permissionIds);
}

}
