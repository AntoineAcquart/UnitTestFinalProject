import { setupWorker, rest } from 'msw'
const worker = setupWorker(
  rest.get(
    "http://localhost:8000/api/cart",
    (req, res, ctx) => {
      return res(
        ctx.json({
          products: [{ "id": 1, "name": "Rick Sanchez", "price": "9,99", "quantity": 30, "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg" },
          { "id": 2, "name": "Morty Smith", "price": "20", "quantity": 20, "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg" },
          { "id": 3, "name": "Summer Smith", "price": "16.50", "quantity": 0, "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg" }]
        })
      )
    }
  ),
  rest.delete(
    "http://localhost:8000/api/cart/3",
    (req, res, ctx) => {
      return res(
        ctx.json({
          products: [
            {
              id: 15,
              name: 'Alien Rick',
              price: '20',
              quantity: 20,
              image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg'
            },
            {
              id: 15,
              name: 'Alien Rick',
              price: '20',
              quantity: 20,
              image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg'
            }
          ]
        }))
    }),
  rest.get(
    "http://localhost:8000/api/products",
    (req, res, ctx) => {
      return res(
        ctx.json({
          products: [{ "id": 1, "name": "Rick Sanchez", "price": "9,99", "quantity": 30, "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg" }, { "id": 2, "name": "Morty Smith", "price": "20", "quantity": 20, "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg" }, { "id": 3, "name": "Summer Smith", "price": "16.50", "quantity": 0, "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg" }]
        }))
    }),
  rest.post(
    "http://localhost:8000/api/cart/3",
    (req, res, ctx) => {
      if (`${req?.body}`.includes("100")) {
        ctx.status(400, "Not enought quantity available")
        return res(ctx.json({}))
      }
      return res(
        ctx.json({
          products: [{ "id": 3, "name": "Summer Smith", "price": "16.50", "quantity": 0, "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg" }]

        }))
    }),
)
// Make the `worker` and `rest` references available globally,
// so they can be accessed in both runtime and test suites.
export default window.msw = {
  worker,
  rest,
}