import { IsNotEmpty } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity()
@Unique(["name"])
export class Product {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    @IsNotEmpty()
    name: string

    @Column()
    @IsNotEmpty()
    price: string

    @Column()
    @IsNotEmpty()
    quantity: number

    @Column()
    @IsNotEmpty()
    image: string

    constructor(product: Partial<Product> = {}) {
    }
}
