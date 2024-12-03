import { Address } from "../../common/address/entities/address.entity";
import { CompanyBase } from "../../common/company/entities/company.entity";
import { Owner } from "src/owners/entities/owner.entity";

import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('clients')
export class Client extends CompanyBase {

 // Identificador único de la empresa
 @PrimaryGeneratedColumn('uuid')
 id: string; 
 
 // Cliente activo
 @Column( 'bool' )
 isActive: boolean;

 // Número de identificación fiscal
 @CreateDateColumn()
 createdAt: Date;

 // Fecha de actualización
 @UpdateDateColumn()
 updatedAt: Date;

 // Relación con el usuario
 @ManyToOne(() => Owner, (owner) => owner.clients)
 owner: Owner;

 // Relación con las direcciones
 @OneToMany(() => Address, (address) => address.client)
 addresses: Address[];

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
