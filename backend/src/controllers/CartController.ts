import { Request, Response } from "express"
import { Cart } from "../entities/cart"
import { CartService } from "../services/CartService"

export default class CartController {

  static get = async (req: Request, res: Response) => {
    try {
      const cart: Cart = await CartService.get()
      res.status(200).send(cart)
    } catch (error) {
      res.status(error.status).send(error.message)
    }
  }

  static addProduct = async (req: Request, res: Response) => {
    try {
      const cart: Cart = await CartService.addProduct(req.params.id, req.body.quantity)
      res.status(200).send(cart)
    } catch (error) {
      res.status(error.status).send(error.message)
    }
  }

  static removeProduct = async (req: Request, res: Response) => {
    try {
      const cart: Cart = await CartService.removeProduct(req.params.id)
      res.status(200).send(cart)
    } catch (error) {
      res.status(error.status).send(error.message)
    }
  }

}
