import { Router } from "express"
import CartController from "../controllers/CartController"

const router = Router()

router.get("/", CartController.get)
router.post("/:id", CartController.addProduct)
router.delete("/:id", CartController.removeProduct)

export default router
