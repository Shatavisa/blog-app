const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const cookieParser = require("cookie-parser");
const { connectDb } = require("./db")
const userRoute = require("./routes/user.route.js")
const authRoute = require("./routes/auth.route.js")
const postRoute = require("./routes/post.route.js")


dotenv.config({
    path: path.resolve(__dirname, './.env')
})
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000;
app.use(cookieParser());


connectDb()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
        
    })
})
.catch((err) => {
    console.log(`MongoDb connection error`, err);
    
})




app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })


})

