import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderHook, act } from '@testing-library/react-hooks'
import useCart from "../../hooks/useCart";
import { mockServer } from "../../mockServer"

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

test("load cart", async () => {
    const { result } = renderHook(() => useCart());
    const { loading, loadCart } = result.current;
    expect(loading).toEqual(true);
    await act(async () => {
        await loadCart()
    });
    const { products } = result.current;
    expect(products).toEqual([{ "id": 1, "name": "Rick Sanchez", "price": "9,99", "quantity": 30, "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg" },
    { "id": 2, "name": "Morty Smith", "price": "20", "quantity": 20, "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg" },
    { "id": 3, "name": "Summer Smith", "price": "16.50", "quantity": 0, "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg" }]
    )
})

test("remove cart", async () => {
    const { result } = renderHook(() => useCart());
    const { loading, removeToCart } = result.current;
    expect(loading).toEqual(true);
    await act(async () => {
        await removeToCart({
            id: 3,
            name: 'Summer Smith',
            price: '15',
            quantity: 5,
            image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
        })
    });
    const { message } = result.current;
    expect(message).toEqual("Produit bien supprimé")
})

