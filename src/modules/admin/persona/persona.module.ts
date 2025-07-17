import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Persona])],
  controllers: [PersonaController],
  providers: [PersonaService],
})
export class PersonaModule {}
