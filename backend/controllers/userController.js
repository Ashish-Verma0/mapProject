const userDatabase = require("../model/userModel")
const catchAsync = require("../utils/catchAsync")
const ErrorHandler = require("../utils/errHandler")
const sendToken = require("../utils/jwtToken")

const newUser = catchAsync(async (req, res, next) => {
    const { userName, email, password } = req.body

    const user = await userDatabase.create({
        userName, email, password
    })

    if (!user) {
        return next(new ErrorHandler("please fill user deatils", 400))
    }

    sendToken(user, 201, res)
})

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler("please enter details"))
    }
    const user = await userDatabase.findOne({ email })

    if (!user) {
        return next(new ErrorHandler("user not found", 404))
    }

    const isPasswordMatches = await user.comparePassword(password)

    if (!isPasswordMatches) {
        return next(new ErrorHandler("password not matched", 404))
    }

    sendToken(user, 200, res)

})

module.exports = {
    newUser, login
}