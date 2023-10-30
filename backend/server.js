const { urlencoded } = require("body-parser")
const express = require("express")
const colors = require("colors")
const connectDB = require("./config/db")
const path = require("path")
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 5000
const app = express()
const errorMiddleware = require("./middleware/errorMiddleware")


//Connect to Database
connectDB()

app.use(express.json())
app.use(urlencoded({ extended: false }))

app.get("/api/users", (req, res) => {
    res.status(200).send("Hello Moein ")
})

app.use("/api/users/", require("./routes/userRoutes"))
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`The server is running on the server ${PORT}`)
})