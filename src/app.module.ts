import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/admin/users/users.module';
import { User } from './modules/admin/users/entities/user.entity';
import { RoleModule } from './modules/admin/role/role.module';
import { PermissionsModule } from './modules/admin/permissions/permissions.module';
import { Role } from './modules/admin/role/entities/role.entity';
import { Permission } from './modules/admin/permissions/entities/permission.entity';
import { PersonaModule } from './modules/admin/persona/persona.module';
import { Persona } from './modules/admin/persona/entities/persona.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.develop.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities:[User, Role, Permission, Persona],
      synchronize: true,
    }),
    UsersModule,
    RoleModule,
    PermissionsModule,
    PersonaModule          
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
