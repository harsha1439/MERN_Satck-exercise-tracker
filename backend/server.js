const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();
// Express setup    
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// MongoDB Setup
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true})
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDb Connection established")
})
const exercisesRouter = require('./routes/exercises')
const userRouter = require('./routes/users')

app.use('/exercises', exercisesRouter)
app.use('/users', userRouter)

app.listen(port, ()=>{
    console.log(`web server listening at: ${port}`)
})