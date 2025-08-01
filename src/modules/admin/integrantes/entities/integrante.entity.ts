import { Integrantes } from "src/modules/auth/interfaces/integrantes.interface";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Liquidaciones } from "../../liquidaciones/entities/liquidaciones.entity";
import { Especialidade } from "../../especialidades/entities/especialidade.entity";
import { IntegranteEspecialidades } from "../../integrante_especialidades/entities/integrante_especialidade.entity";

@Entity()
export class Integrante implements Integrantes {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    tarifa_base_hora: number;

    @Column({type: 'date'})
    fecha_ingreso: Date;

    @Column({default: true})
    estado: boolean;

    @CreateDateColumn({type: 'date'})
    creado_en: Date;

    @UpdateDateColumn({type: 'date'})
    actualizado_en: Date;

    @OneToOne(() => User, (u) => u.integrante)
    @JoinColumn({ name: 'user_id' })
    user: User

 // ✅ Un integrante puede tener muchas liquidaciones
  @OneToMany(() => Liquidaciones, (liquidacion) => liquidacion.integrante)
  liquidaciones: Liquidaciones[];

  
 @OneToMany(() => IntegranteEspecialidades, (ie) => ie.integrante)
  especialidades: IntegranteEspecialidades[];


}
