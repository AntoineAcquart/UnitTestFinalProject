import { rest } from "msw";
import { setupServer } from "msw/node";
import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import App from '../../App';
import Product from "../../components/Product";
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
    const product = {
        id: 3,
        name: 'Summer Smith',
        price: '15',
        quantity: 5,
        image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
    }

    act(() => {
        ReactDOM.render(<Product data={product} />, container);
    })
    expect((await screen.findAllByText("Figurine de Summer Smith", { exact: false })).length).toBe(1)

    // //test button go to cart
    // const goToCart = screen.getAllByRole("div")
    // goToCart[2].dispatchEvent(new MouseEvent("click", { bubbles: true }))
    // expect(container.baseURI).toContain("home")
});
