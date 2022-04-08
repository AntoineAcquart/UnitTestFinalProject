import { Router } from "express"
import products from "./products"
import cart from "./cart"

const routes = Router()

routes.use("/products", products)
routes.use("/cart", cart)


export default routes
