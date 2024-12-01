import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

// Tabla de autenticación de usuarios
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('text', { unique: true })
  fullName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  adaptData() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  updateData() {
    this.email = this.email.toLowerCase().trim();
  }
}
