import { Client } from '../../../clients/entities/client.entity';
import { Owner } from '../../../owners/entities/owner.entity';
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


@Entity('addresses')
export class Address {

  // Identificador único de la dirección
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Dirección activa
  @Column('bool', { default: true })
  isActive: boolean;

  // Dirección 
  @Column('text')
  address: string;

  // Código postal
  @Column('text', {default: '46250'})
  zipCode: string;

  // Ciudad
  @Column('text')
  city: string;

  // Provincia
  @Column('text', {default: 'Valencia'})
  state: string;

  // País
  @Column('text', {default: 'España'})
  country: string;

  // Relación con el propietario
  @ManyToOne(() => Owner, (owner) => owner.addresses, { nullable: true })
  owner: Owner;

  // Relación con el cliente
  @ManyToOne(() => Client, (client) => client.addresses, { nullable: true })
  client: Client;

  // Fecha de creación
  @CreateDateColumn()
  createdAt: Date;

  // Fecha de actualización
  @UpdateDateColumn()
  updatedAt: Date;

  // Acciones antes de insertar
  @BeforeInsert()
  setDefaultValues() {
    this.isActive = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Acciones antes de actualizar
  @BeforeUpdate()
  setUpdateAtValue() {
    this.updatedAt = new Date();
  }
}
