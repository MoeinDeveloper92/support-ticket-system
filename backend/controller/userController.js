const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")
const generateToken = require("../auth/generateToken")

//@desc     Register a User
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body

    //validation
    if (!name || !email || !password) {
        // 400 is a client error
        res.status(400)
        throw new Error("Please include all fields")
    }

    //Find if user Already Exist
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error("User Already Exist")
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,

    })
    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    } else {
        // Client Error
        res.status(400)
        throw new Error("Something went wrong")
    }
})

//@desc     Login User
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res, next) => {
    //check for data
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("Please add all the fields.")
    }
    const user = await User.findOne({ email })
    //check user and password match
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Credentials")
    }
    res.status(200).json({
        msg: "Login user"
    })
})


//@desc     Get current User
//@route    GET /api/users/me
//@access   Private
//we need to createa a piece of middleware to protect the route
const getMe = asyncHandler(async (req, res, next) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    res.status(200).json(user)
})


module.exports = {
    registerUser,
    loginUser, getMe
}