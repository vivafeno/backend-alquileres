import { Owner } from '../../owners/entities/owner.entity';
import { CompanyBase } from '../../common/company/entities/company.entity';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


// Tabla de autenticación de usuarios
@Entity('users')
export class User {

  // Identificador único del usuario
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Usuario activo
  @Column('bool', { default: true })
  isActive: boolean;

  // Nombre completo
  @Column('text', { unique: true })
  fullName: string;

  // Correo electrónico
  @Column('text', { unique: true })
  email: string;

  // Contraseña
  @Column('text', {
    select: false,
  })
  password: string;

  // Roles de usuario
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  // Relación con sus propietarios
  @OneToMany(() => Owner, (owner) => owner.user)
  owners: Owner[];

  // Fecha de creación
  @CreateDateColumn()
  created_at: Date;

  // Fecha de actualización
  @UpdateDateColumn()
  updated_at: Date;


  // Acciones antes de insertar
  @BeforeInsert()
  adaptData() {
    this.email = this.email.toLowerCase().trim();
  }

  // Acciones antes de actualizar
  @BeforeUpdate()
  updateData() {
    this.email = this.email.toLowerCase().trim();
  }
}
