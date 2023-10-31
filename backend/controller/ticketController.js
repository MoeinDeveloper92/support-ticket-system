const asyncHandler = require("express-async-handler")
const Ticket = require("../models/ticketModel")
const User = require("../models/userModel")




//@desc     Get USer Ticket
//@route    GET /api/tickets
//@access   Private
const getTickets = asyncHandler(async (req, res, next) => {
    //Get usee usign the id in jwt
    //since this is the protected route we have access to the req.user
    const user = await User.findById(req.user.id)
    //if there is no user
    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    }

    //get tickets
    //Go to tickets collection and requrn those docue,ts whoch has user:req.user.id 
    const tickets = await Ticket.find({ user: req.user.id })
    res.status(200).json(tickets)
})


//@desc     Get user ticket
//@route    GET /api/tickets/:id
//@access   Private
const getTicket = asyncHandler(async (req, res, next) => {
    //check user by req.user.id
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User Not Authorized")
    }

    //get the ticket
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error("ticket not found")
    }

    //we dont want any body to get the ticket, therefore we need to limit this
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized")
    }

    res.status(200).json(ticket)
})



//@desc     Create New Ticket
//@route    POST /api/tickets
//@access   Private
const createTicket = asyncHandler(async (req, res, next) => {
    const { product, description } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error("Please add all the fields!")
    }

    //Check for the user
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }
    const newTicket = await Ticket.create({
        user: req.user.id,
        product,
        description,
        status: "new",
    })

    res.status(201).json(newTicket)
})


//@desc     Delte ticket
//@route    DELETE /api/tickets/:id
//@access   Private
const deleteTicket = asyncHandler(async (req, res, next) => {
    //Get the user usong id in the jwt
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User Not Found")
    }

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error("Ticket Not Found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized ")
    }

    await Ticket.findByIdAndRemove(req.params.id)
    res.status(200).json({
        success: true
    })
})



//@desc     Update Ticket
//@route    PUT /api/tickets/:id
//@access   Private
const updateTicket = asyncHandler(async (req, res, next) => {
    //get the user by req.user.id
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User Not Found")
    }

    //checl for the ticket
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error("Ticket Not Found")
    }

    //we dont one any one to be able to delte the ticket
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authoruized")
    }

    const updTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updTicket)
})


module.exports = {
    getTickets,
    createTicket,
    getTicket,
    updateTicket,
    deleteTicket
}