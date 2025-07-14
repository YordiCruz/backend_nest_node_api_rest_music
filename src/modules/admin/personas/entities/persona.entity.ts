import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Persona {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombres: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  apellidos: string;

  @Column({ type: 'date', name: 'fecha_nacimiento' })
  fecha_nacimiento: Date;

  @Column({ 
    type: 'enum',
    enum: ['masculino', 'femenino', 'otro', 'prefiero_no_decir'],
    default: 'prefiero_no_decir'
  })
  genero: string;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @Column({ type: 'text', nullable: true }) // Opcional
  direccion: string;

  // 👇 Auditoría
  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;

  @DeleteDateColumn({ name: 'eliminado_en' })
  eliminadoEn: Date; // Soft delete


  
    @OneToOne(() => User, user => user.persona, { nullable: true })
    user: User;
}

