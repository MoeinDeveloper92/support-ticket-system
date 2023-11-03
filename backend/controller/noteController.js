const asyncHandler = require("express-async-handler")
const Ticket = require("../models/ticketModel")
const User = require("../models/userModel")
const Note = require("../models/noteModel")



//@desc     Get Notes For a Ticket
//@route    GET /api/tickets/:ticketId/notes
//@access   Private
const getNotes = asyncHandler(async (req, res, next) => {
    //Get usee usign the id in jwt
    //since this is the protected route we have access to the req.user
    const user = await User.findById(req.user.id)
    //if there is no user
    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    }

    //we need to get the related ticjket
    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized")
    }

    //get notes
    const notes = await Note.find({ ticket: req.params.ticketId })
    res.status(200).json(notes)

})

//@desc     Create Ticket Note
//@route    POST/api/tickets/:ticketId/notes
//@access   Private
const addNote = asyncHandler(async (req, res, next) => {
    //Get the user by the id from the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User Not Found")
    }

    //Get the tuicket
    const ticket = await Ticket.findById(req.params.ticketId)
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not Authorized")
    }

    const note = await Note.create({
        user: req.user.id,
        ticket: req.params.ticketId,
        text: req.body.text,
        isStaff: false
    })
    res.status(201).json(note)
})



module.exports = {
    getNotes,
    addNote
}