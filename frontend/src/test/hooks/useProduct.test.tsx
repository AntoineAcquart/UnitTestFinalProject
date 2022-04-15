import { renderHook, act } from '@testing-library/react-hooks'
import useProduct from "../../hooks/useProduct";
import { mockServer } from "../../mockServer"

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

test("Add product", async () => {
    let product = {
        id: 3,
        name: 'Summer Smith',
        price: '15',
        quantity: 5,
        image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
    }
    const { result } = renderHook(() => useProduct(product));
    const { loading, addProduct, setQuantity } = result.current;
    expect(loading).toEqual(false);
    await act(async () => {
        setQuantity(2)
        await addProduct()
    });
    const { message } = result.current;
    expect(message).toEqual("Enregistré dans le panier")
})

test("Add product error", async () => {
    let product = {
        id: 3,
        name: 'Summer Smith',
        price: '15',
        quantity: 0,
        image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
    }
    const { result } = renderHook(() => useProduct(product));
    const { loading, setQuantity } = result.current;
    expect(loading).toEqual(false);
    act(() => {
        setQuantity(100)
    });
    const { addProduct, quantity } = result.current;
    await act(async () => {
        await addProduct()
    });
    const { message } = result.current;
    expect(message).toEqual("Trop de quantité")
})



