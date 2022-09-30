const pinDatabase = require("../model/pinModal")
const catchAsync = require('../utils/catchAsync')
const errHandler = require('../utils/errHandler')

const allPins = catchAsync(async (req, res, next) => {
    const user = await pinDatabase.find({})

    res.status(200).json({
        message: "successfully ",
        user
    })
})

const pinUser = catchAsync(async (req, res, next) => {
    const user = await pinDatabase.create(req.body)

    if (!user) {
        return next(new errHandler("please fill all details", 400))
    }

    res.status(200).json({
        message: "pinned successfullly",
        user
    })
})

module.exports = {
    pinUser, allPins
}