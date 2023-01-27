require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users')

// express app
const app = express()

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.get('/', (req, res) => {
    res.json({mess: 'main'})
})
app.use('/api/users', userRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })