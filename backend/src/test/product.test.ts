import { CartService } from "../services/CartService";
import { ProductService } from "../services/ProductService";

describe('ProductService', () => {
    beforeAll(async () => {
        await CartService.create()
        await ProductService.createAll()
    })
    it('getAll', async () => {
        expect((await ProductService.getAll()).length).toEqual(20)
    })
})