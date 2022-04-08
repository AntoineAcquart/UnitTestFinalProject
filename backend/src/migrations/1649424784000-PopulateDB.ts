import { getRepository, MigrationInterface, QueryRunner } from "typeorm"
import { CartService } from "../services/CartService"
import { ProductService } from "../services/ProductService"

export class PopulateDB1649424784000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await CartService.create()
    await ProductService.createAll()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return
  }
}
