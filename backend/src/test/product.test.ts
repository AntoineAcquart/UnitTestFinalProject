
import { Product } from "../entities/product"
import { CartService } from "../services/CartService"
import { ProductService } from "../services/ProductService"
import { getRepository } from "typeorm"
import connection from '../connection'
import { HttpError } from "../models/error/httpError"
import mockServer from "../mockServer"


describe('ProductService', () => {
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

    let product: Product

    it('createOne', async () => {
        product = await ProductService.createOne({
            name: "Test Character",
            price: "15",
            quantity: 20,
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        })
        expect(product.name).toEqual("Test Character")
    })
    it('getAll', async () => {
        expect((await ProductService.getAll()).length).toEqual(3)
    })
    it('getOne', async () => {
        let product: Product = await getRepository(Product).findOne()
        expect((await ProductService.getOne(product.id)).name).toEqual("Rick Sanchez")
    })
    it('getOne not found', async () => {
        let error: HttpError
        try {
            await ProductService.getOne("")
        } catch (e) {
            error = e
        }
        expect(error.message).toEqual("Product not found")
    })
})