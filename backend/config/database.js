const mongoose = require('mongoose')

const mongodbUrl = "mongodb://localhost:27017/map"

mongoose.connection.once('open', () => {
    console.log("database connected successfully")
})
mongoose.connection.on('end', () => {
    console.log("database not connected")
})

const databaseConnection = () => {

    mongoose.connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
module.exports = databaseConnection