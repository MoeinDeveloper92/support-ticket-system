const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add name field"],
    },
    email: {
        type: String,
        required: [true, "Please add email field"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add password field"]
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
})


const User = mongoose.model("User", userSchema)

module.exports = User