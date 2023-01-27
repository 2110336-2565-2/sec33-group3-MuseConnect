require('dotenv').config()
const express = require('express')

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

// listen for requests
app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port 4000');
})