import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./product"

@Entity()
export class Cart {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[]

    constructor() { }
}
