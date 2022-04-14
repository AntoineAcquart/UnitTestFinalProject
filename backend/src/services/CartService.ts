import { getRepository } from "typeorm"
import { Cart } from "../entities/cart"
import { Product } from "../entities/product"
import { HttpError } from "../models/error/httpError"
import { ProductService } from "./ProductService"

export class CartService {

  static get = async (): Promise<Cart> => {
    try {
      return await getRepository(Cart).findOneOrFail({ relations: ['products'] })
    } catch (e) {
      throw new HttpError(404, "Cart not Found", e)
    }
  }

  static create = async (): Promise<Cart> => {
    const cart: Cart = await getRepository(Cart).findOne({ relations: ['products'] })
    if (cart) return cart
    const cartRepository = getRepository(Cart)
    try {
      return await cartRepository.save(new Cart())
    } catch (e) {
      throw new HttpError(500, "Internal Error", e)
    }
  }

  static addProduct = async (productId: string, quantity: number): Promise<Cart> => {
    const cartRepository = getRepository(Cart)
    let cart: Cart
    try {
      cart = await cartRepository.findOneOrFail({ relations: ['products'] })
    } catch (error) {
      throw new HttpError(404, "Cart not found", error)
    }
    let product: Product
    try {
      product = await ProductService.getOne(productId)
    } catch (error) {
      throw new HttpError(404, "Product not found", error)
    }

    if (!cart.products) cart.products = []

    if (quantity > product.quantity) {
      throw new HttpError(400, "Not enought quantity available", null)
    }

    cart.products.push(product)

    try {
      await cartRepository.save(cart)
    } catch (e) {
      throw new HttpError(500, "Internal Error", e)
    }

    return await cartRepository.findOneOrFail({ relations: ['products'] })
  }

  static removeProduct = async (productId: string): Promise<Cart> => {
    const cartRepository = getRepository(Cart)
    let cart: Cart
    try {
      cart = await cartRepository.findOneOrFail({ relations: ['products'] })
    } catch (error) {
      throw new HttpError(404, "Cart not found", error)
    }
    let product: Product
    try {
      product = await ProductService.getOne(productId)
    } catch (error) {
      throw new HttpError(404, "Product not found", error)
    }

    try {
      cart.products.splice(cart.products.findIndex(p => p.id == productId), 1)
      await cartRepository.save(cart)
    } catch (e) {
      throw new HttpError(500, "Internal Error", e)
    }

    return await cartRepository.findOneOrFail({ relations: ['products'] })
  }

}
