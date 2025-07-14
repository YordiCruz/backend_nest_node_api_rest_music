import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Persona } from "../../personas/entities/persona.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Exclude() // Excluye esta propiedad al transformar a objeto plano
    @Column({ select: false }) // No lo incluye en queries por defecto
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

   @OneToOne(() => Persona, persona => persona.user, { 
        nullable: true,
        cascade: true // Opcional: permite guardar automáticamente la persona al guardar el usuario
    })
    @JoinColumn() // Esto hace que User sea el dueño de la relación
    persona?: Persona;
}
