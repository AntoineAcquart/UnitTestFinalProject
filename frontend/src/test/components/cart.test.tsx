import { screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import Cart from "../../components/Cart";
import { mockServer } from "../../mockServer"

let container: any;


beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

test('renders', async () => {
    act(() => {
        ReactDOM.render(<Cart setRoute={() => { }} />, container);
    })
    expect((await screen.findAllByText("Figurine de Rick Sanchez", { exact: false })).length).toBe(1)
    expect((await screen.findAllByText("Figurine de Morty Smith", { exact: false })).length).toBe(1)
    expect((await screen.findAllByText("Figurine de Summer Smith", { exact: false })).length).toBe(1)

    // expect(container.baseURI).toContain("home")
    //expect((await screen.findAllByText("Figurine de Summer Smith", { exact: false })).length).toBe(1)

    // //test button go to cart
    // const goToCart = screen.getAllByRole("div")
    // goToCart[2].dispatchEvent(new MouseEvent("click", { bubbles: true }))
});
