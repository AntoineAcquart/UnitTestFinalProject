import { screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import Home from "../../components/Home";
import { mockServer } from "../../mockServer";

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
        ReactDOM.render(<Home setRoute={() => { }} />, container);
    })
    expect(screen.getAllByText('Aller sur panier').length).toBe(1)
});
