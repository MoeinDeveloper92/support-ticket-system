const express = require("express")
const router = express.Router({ mergeParams: true })
const { protect } = require("../middleware/authMiddleware")
const { getNotes, addNote } = require("../controller/noteController")


router.route("/").get(protect, getNotes).post(protect, addNote)

module.exports = router


// /api/tickets/:ticketId/note
//this route comes from ticket routes, which means somewhow this is the child of the ticket route
//so in the ticket route we need to let the route to be merged with the child