import { IsArray, IsUUID } from 'class-validator';

export class RemoveRoleDto {
  @IsArray()
  @IsUUID('4', { each: true })
  roleIds: string[];
}
