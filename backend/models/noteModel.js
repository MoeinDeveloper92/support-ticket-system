const mongoose = require("mongoose")



//we need to know whcih user applies that note
//we need to know which tikcet this note is realted to...
const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Ticket"
    },
    text: {
        type: String,
        required: [true, "Please add some text"]
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: String
    }
}, {
    timestamps: true
})


const Note = mongoose.model("Note", noteSchema)

module.exports = Note