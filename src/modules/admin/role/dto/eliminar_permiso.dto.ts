import { IsArray, IsUUID } from 'class-validator';

export class RemovePermissionsDto {
  @IsArray()
  @IsUUID('4', { each: true })
  permissionIds: string[];
}
