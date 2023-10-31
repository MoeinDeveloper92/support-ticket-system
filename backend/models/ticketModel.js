const mongoose = require("mongoose")


const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: String,
        required: [true, "Please select a product"],
        enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad']
    },
    description: {
        type: String,
        required: [true, "Please enter a Description"]
    },
    status: {
        type: String,
        enum: ['new', 'open', 'closed'],
        default: 'new',
        required: true
    }

}, {
    timestamps: true
})



const Ticket = mongoose.model("Ticket", ticketSchema)
module.exports = Ticket