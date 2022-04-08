import { Router } from "express"
import ProductController from "../controllers/ProductController"

const router = Router()

router.get("/", ProductController.getAll)

export default router
