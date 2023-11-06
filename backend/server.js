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


app.use("/api/users/", require("./routes/userRoutes"))

app.use("/api/tickets/", require("./routes/ticketRoutes"))

//Server Frontend
if (process.env.NODE_ENV === "production") {
    //Set build folder as static
    app.use(express.static(path.join(__dirname, "../frontend/build")))

    app.get("*", (req, res) => {
        res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
    })
} else {
    app.get("", (req, res) => {
        res.status(200).json({ mssage: "Welcome to the support desk API." })
    })

}

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`The server is running on the server ${PORT}`)
})