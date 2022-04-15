import { Product } from "../entities/product";
import { Cart } from "../entities/cart";
import { CartService } from "../services/CartService";
import { ProductService } from "../services/ProductService";
import { getRepository } from "typeorm"
import connection from "../connection";
import { HttpError } from "../models/error/httpError";
import mockServer from "../mockServer";

describe('CartService', () => {
    beforeAll(async () => {
        mockServer.listen()
        await connection.create()
        await connection.clear()
        await CartService.create()
        await ProductService.createAll()
    })

    afterEach(() => mockServer.resetHandlers())

    afterAll(async () => {
        await connection.close()
        mockServer.close()
    })

    it('get', async () => {
        expect((await CartService.get())).toBeInstanceOf(Cart)
    })

    it('addProduct', async () => {
        const createdProduct = await ProductService.createOne({
            name: "Cart Test Character",
            price: "15",
            quantity: 20,
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        })
        await CartService.addProduct(createdProduct.id.toString(), 1)
        let cart: Cart = await getRepository(Cart).findOneOrFail({ relations: ['products'] })
        expect(cart.products.find(p => p.name == "Cart Test Character")).toEqual(createdProduct)
    })
    it('removeProduct', async () => {
        let product: Product = await getRepository(Product).findOne({ where: { name: "Cart Test Character" } })
        await CartService.removeProduct(product.id.toString())
        let cart: Cart = await getRepository(Cart).findOneOrFail({ relations: ['products'] })
        expect(cart.products.length).toEqual(0)
    })

    it('addProduct error, Product not Found', async () => {
        let error: HttpError
        try {
            await CartService.addProduct("999999999", 1)
        } catch (e) {
            error = e
        }
        expect(error.message).toEqual("Product not found")
    })

    it('addProduct error, Not enought quantity available', async () => {
        let error: HttpError
        try {
            let product: Product = await getRepository(Product).findOne({ where: { name: "Cart Test Character" } })
            await CartService.addProduct(product.id.toString(), product.quantity + 1)
        } catch (e) {
            error = e
        }
        expect(error.message).toEqual("Not enought quantity available")
    })
})