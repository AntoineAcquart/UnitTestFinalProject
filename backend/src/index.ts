import * as cors from "cors"
import * as express from "express"
import * as helmet from "helmet"
import * as http from "http"
import "reflect-metadata"
import { getConnection } from "typeorm"
import connection from "./connection"
import routes from "./routes"

// Connects to the Database -> then starts the express

connection.create().then(async () => {
    await connection.clear()
    await getConnection().undoLastMigration()
    await getConnection().runMigrations().catch((error) => console.log(error))

    process.on('uncaughtException', e => {
        console.log('uncaughtException: ', e)
    })

    // Create a new express application instance
    const app = express()

    // Call midlewares
    app.use(cors())
    app.use(helmet())
    app.use(express.json({ limit: "50mb" }))
    app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

    // Set all routes from routes folder
    app.use("/api/", routes)

    // Create http server
    const server = http.createServer(app)

    server.listen(8000, () => {
        console.log("Server started on port ", 8000)
    })
}).catch((error) => console.log(error))
