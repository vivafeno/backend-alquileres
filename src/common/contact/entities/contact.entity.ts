import { Client } from 'src/clients/entities/client.entity';
import { Owner } from 'src/owners/entities/owner.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('bool', { default: true })
  isActive: boolean;

  // Nombre completo
  @Column('text')
  fullName: string;

  // Correo electrónico
  @Column('text')
  email: string;

  // Relación con propietarios
  @ManyToOne(() => Owner, (owner) => owner.contacts, { nullable: true })
  owner: Owner;

  // Relación con los clientes
  @ManyToOne(() => Client, (client) => client.contacts, { nullable: true })
  client: Client[];

  // Fecha de creación
  @CreateDateColumn()
  createdAt: Date;

  // Fecha de actualización
  @CreateDateColumn()
  updatedAt: Date;

  // Antes de insertar
  @BeforeInsert()
  setDefaultValues() {
    this.isActive = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Antes de actualizar
  @BeforeUpdate()
  setUpdateDefaultValues() {
    this.updatedAt = new Date();
  }
}
