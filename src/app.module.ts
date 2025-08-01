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
import { AuthModule } from './modules/auth/auth.module';
import { IntegrantesModule } from './modules/admin/integrantes/integrantes.module';
import { Integrante } from './modules/admin/integrantes/entities/integrante.entity';
import { LiquidacionesModule } from './modules/admin/liquidaciones/liquidaciones.module';
import { Liquidaciones } from './modules/admin/liquidaciones/entities/liquidaciones.entity';
import { EspecialidadesModule } from './modules/admin/especialidades/especialidades.module';
import { IntegranteEspecialidadesModule } from './modules/admin/integrante_especialidades/integrante_especialidades.module';
import { CategoriaEspecialidadesModule } from './modules/admin/categoria_especialidades/categoria_especialidades.module';
import { IntegranteEspecialidades } from './modules/admin/integrante_especialidades/entities/integrante_especialidade.entity';
import { Especialidade } from './modules/admin/especialidades/entities/especialidade.entity';
import { CategoriaEspecialidade } from './modules/admin/categoria_especialidades/entities/categoria_especialidade.entity';

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
      entities:[User, Role, Permission, Persona, Integrante, Liquidaciones, Especialidade, CategoriaEspecialidade, IntegranteEspecialidades],
      synchronize: true,
    }),
    UsersModule,
    RoleModule,
    PermissionsModule,
    PersonaModule,
    AuthModule,
    IntegrantesModule,
    LiquidacionesModule,
    EspecialidadesModule,
    CategoriaEspecialidadesModule,
    IntegranteEspecialidadesModule          
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
