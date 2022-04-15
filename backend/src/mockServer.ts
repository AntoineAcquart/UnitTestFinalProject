import { rest } from "msw"
import { setupServer } from "msw/node"

const mockServer = setupServer(
    rest.get(
        "https://rickandmortyapi.com/api/character",
        (req, res, ctx) => {
            return res(
                ctx.json({
                    results: [{ name: 'Rick Sanchez', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' }, { name: 'Morty Smith', image: 'ttps://rickandmortyapi.com/api/character/avatar/2.jpeg' }]
                }
                )
            )
        }
    )
)

export default mockServer