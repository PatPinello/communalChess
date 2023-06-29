require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes/communalChess')
const userRoutes = require('./routes/user')

const app = express()

//load up env
process.env

//middleware
app.use(express.json())
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

//^registering routes
app.use('/api/communalChess',routes)
app.use('/api/user',userRoutes)

//connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
            //listen
    app.listen(process.env.PORT, () => {
        console.log('listening on port ', process.env.PORT)
    })

    })
    .catch((error)=>{
        console.log(error)
    })

