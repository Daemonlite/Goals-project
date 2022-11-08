const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middlewares/errorMiddleware')
const connectDb = require('./config/db')
const colors = require('colors')
const port = process.env.PORT || 5000
const app = express()

connectDb()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(errorHandler)
app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.listen(port,()=>console.log(`server running on port ${port}`))