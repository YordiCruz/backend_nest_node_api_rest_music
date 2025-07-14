import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Persona } from '../personas/entities/persona.entity';
import { CreatePersonaDto } from '../personas/dto/create-persona.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,

     @InjectRepository(User)
     private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {

        // capturamos los mas importantes del dto y con ...rest capturamos el resto
    const {email, username, ...rest } = createUserDto;

    // verificar si ya existe el username
   const existeusername = await this.userRepository.findOne({where: {username: username}});
   if (existeusername) {
     throw new BadRequestException(`El username "${username}" ya está en uso`);

   } 

   // verificar si ya existe el email
   const existeemail = await this.userRepository.findOne({where: {email: email}});
   if (existeemail) {
     throw new BadRequestException(`El email "${email}" ya está en uso`);
   
    }

    // //roles 
    // let roles: Role[] = [];

    // if (roleIds?.length) {
    //   roles = await this.rolesRepository.find({where: {id: In(roleIds)}});
    //   if (roles.length !== roleIds.length) {
    //     throw new BadRequestException(`Los roles no existen`);
    //   }
    // }



    //encriptar la password
   // console.log(rest);
    // el 12 es la cantidad de rondas de encriptacion mientas ma alta sea mas seguro sera
    const hashPassword = await bcrypt.hash(rest.password, 12);
    //console.log(hashPassword);
    const newUser = this.userRepository.create({
      //deberia de ser asi username: username pero como es el mismo nombre no es necesario
      username, 
      email, 
      password: hashPassword,
      //roles
    });

    this.userRepository.save(newUser);
    const {password, ...resto_datos} = newUser


    return resto_datos;



//     // Validar que vengan los datos de persona
//   if (!createUserDto.persona) {
//     throw new BadRequestException('Los datos de persona son requeridos');
//   }
//     // Trabajar con transacciones

//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();

//     try {
//       const userRep = queryRunner.manager.getRepository(User);
//       const personaRep = queryRunner.manager.getRepository(Persona);

//       //Verificar si ya existe el username
//       const existeuser = await userRep.findOne({
//         where: { username: createUserDto.username },
//       });

//       if (existeuser) {
//         throw new BadRequestException(
//           `El username "${createUserDto.username}" ya esta en uso`,
//         );
//       }

//       //Verificar si ya existe el email
//       const existeEmail = await userRep.findOne({
//         where: { email: createUserDto.email },
//       });

//       if (existeEmail) {
//         throw new BadRequestException(`El email "${createUserDto.email}" ya esta en uso`);
//       }

      

//       //crear la persona
//       const newPersona = personaRep.create(
//         createUserDto.persona
//       );
//       await personaRep.save(newPersona);
    
//       //crear al usuario
//       const { email, username, ...rest } = createUserDto;

//     //encriptacion de la contraseña
//     const hashpassword = await bcrypt.hash(rest.password, 12);
    

//     const newuser = userRep.create({
//       ...rest,
//       email,
//       username,
//       password: hashpassword,
//       persona: newPersona
//     });

//     await userRep.save(newuser);
//     await queryRunner.commitTransaction();
//     return newuser;
// //    await queryRunner.manager.save(newuser);
  
    



//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//       throw error;

//     }finally {
//       await queryRunner.release();
//     }

  }

  findAll(): Promise<User[]> {
    //relacionar para la busqueda de personas

    return this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.persona', 'persona')
      .getMany();
    
  }

 async findOne(id: string): Promise<User> {
   const user = await this.userRepository.findOne({
      where: { id },
      relations: ['persona'] // Carga la relación
   });

   if (!user) {
      throw new NotFoundException(`El usuario #${id} no encontrado`);
   }
   return user;
}


  //definimos el findbyemail
  async findOneByEmail(email: string) {
  return this.userRepository
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email', { email })
    .getOne();
}



  async update(id: string, updateUserDto: UpdateUserDto) {
    // const user = await this.findOne(id);
    // Object.assign(user, updateUserDto);
    // return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`El usuario #${id} no encontrado`);
    }
  }
}

