import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected TO MongoDB ")
})
.catch((err) => {
    console.log(err)
})

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Hello World")
})


// import routes 
import authRoutes from './routes/auth.routes.js'
import messageRoute from './routes/message.routes.js'
import userRoute from './routes/user.routes.js'

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoute)
app.use("/api/users", userRoute)



app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})

// error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})