import { Request, Response } from "express"
import { Product } from "../entities/product"
import { ProductService } from "../services/ProductService"

export default class ProductController {

  static getAll = async (req: Request, res: Response) => {
    try {
      const products: Product[] = await ProductService.getAll()
      res.status(200).send(products)
    } catch (error) {
      res.status(error.status).send(error.message)
      return
    }
  }
}
