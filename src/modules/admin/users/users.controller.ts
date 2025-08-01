import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RemoveRoleDto } from './dto/eliminar_role.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }



  @Patch(':id/role/replace')
  replaceRole(
    @Param('id') id: string,
    @Body() body: { removeId: string; addId: string },
  ) {
    return this.usersService.replaceRoleInUser(
      id,
      body.removeId,
      body.addId,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  
  @Patch(':id/role/remove')
  removeRole(
    @Param('id') id: string,
    @Body() dto: RemoveRoleDto,
  ) {
    return this.usersService.removeRoleFromUser(id, dto.roleIds);
  }

}
