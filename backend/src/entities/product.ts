import { IsNotEmpty } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity()
@Unique(["name"])
export class Product {

    @PrimaryGeneratedColumn("increment")
    id: number

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
