import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, ManyToOne, Entity, OneToMany } from 'typeorm';

import { Address } from '../../../common/address/entities/address.entity';

@Entity('companiBase')
export abstract class CompanyBase {

    // Identificador único de la empresa
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Número de identificación fiscal
    @Column( 'text' )
    taxId: string;
    
    // Nombre de la empresa
    @Column( 'text' )
    name: string;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    setDefaultValues() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    setUpdateAtValue() {
        this.updatedAt = new Date();
    }

}
