import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { Client } from "src/clients/entities/client.entity";
import { CompanyBase } from "../../common/company/entities/company.entity";
import { Address } from "../../common/address/entities/address.entity";

@Entity('owners')
export class Owner extends CompanyBase {
 
    // Propietario activo
    @Column( 'bool' )
    isActive: boolean;

    // Número de identificación fiscal
    @CreateDateColumn()
    createdAt: Date;

    // Fecha de actualización
    @UpdateDateColumn()
    updatedAt: Date;

    // Relación con el usuario
    @ManyToOne(() => User, (user) => user.owners)
    user: User;
  
    // Relación con los clientes
    @OneToMany(() => Client, (client) => client.owner)
    clients: Client[];

    @OneToMany(() => Address, (address) => address.owner)
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
