import { getRepository } from "typeorm"
import { Product } from "../entities/product"
import { HttpError } from "../models/error/httpError"
import axios from "axios"

export class ProductService {

  static getAll = async (): Promise<Product[]> => {
    try {
      return await getRepository(Product).find()
    } catch (e) {
      throw new HttpError(500, "Internal Error", e)
    }
  }

  static getOne = async (id: number): Promise<Product> => {
    try {
      return await getRepository(Product).findOneOrFail(id)
    } catch (e) {
      throw new HttpError(404, "Product not found", e)
    }
  }

  static createAll = async (): Promise<any> => {
    if ((await getRepository(Product).find()).length > 0) return
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character')
      const characters = response.data.results
      const prices = ["8", "9,99", "15", "16.50", "20"]
      const quantites = [0, 2, 5, 20, 30, 70]

      for (let character of characters) {
        await ProductService.createOne({
          name: character.name,
          price: prices[Math.floor(Math.random() * prices.length)],
          quantity: quantites[Math.floor(Math.random() * quantites.length)],
          image: character.image
        })
      }

    } catch (e) {
      throw new HttpError(500, "Internal Error", e)
    }
  }
  static createOne = async (product: Partial<Product>): Promise<Product> => {
    try {
      return await getRepository(Product).save(product)
    } catch (e) {
      throw new HttpError(500, "Internal Error", e)
    }
  }
}
