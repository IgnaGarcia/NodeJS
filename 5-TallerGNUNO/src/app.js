const express = require('express')
const workshopRoutes = require('./routes/workshop.routes')

const app = express()

app.use(express.json())

app.use('/workshop', workshopRoutes)

app.get('/', (req, res) => {
    res.send('Hola mundo!')
})

module.exports = app