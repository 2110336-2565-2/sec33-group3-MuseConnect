require('dotenv').config()
const express = require('express')

// express app
const app = express()

// routes
app.get('/', (req, res) => {
    res.json({mess: 'main'})
})

// listen for requests
app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port 4000');
})