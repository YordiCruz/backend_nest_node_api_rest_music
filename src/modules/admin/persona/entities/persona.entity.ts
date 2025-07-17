import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity('persona')   
export class Persona {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombres: string;
    @Column()
    apellidos: string;

    @Column({unique: true})
    ci_dni: string;

    @Column({type: 'date'})
    fecha_nacimiento: Date;

    @Column({nullable: true})
    genero: string;

    @Column({ nullable: true })
    telefono?: string;

    @Column({ nullable: true })
    direccion?: string;

    @OneToOne(() => User, user => user.persona, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'user_id' })
    user: User
}
