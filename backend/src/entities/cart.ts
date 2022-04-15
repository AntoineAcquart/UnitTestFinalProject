import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./product"

@Entity()
export class Cart {

    @PrimaryGeneratedColumn("increment")
    id: number

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[]

    constructor() { }
}
