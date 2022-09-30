const mongoose = require("mongoose")

const pinSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "please enter your name"]
    },
    title: {
        type: String,
        required: [true, "please enter your title"]
    },
    desc: {
        type: String,
        required: [true, "please enter your desc"]
    },
    rating: {
        type: Number,
        required: [true, "please select your rating"]
    },
    lat: {
        type: Number,
        required: [true, "please enter your latitude"]
    },
    long: {
        type: Number,
        required: [true, "please enter your longitude"]
    },
}, { timestamps: true })

module.exports = mongoose.model("pinDatabase", pinSchema)