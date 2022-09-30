const app = require("./app")
const databaseConnection = require("./config/database")
require('dotenv').config();
const PORT = process.env.PORT || 8089

const startServer = () => {
    databaseConnection()
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })

}
startServer()