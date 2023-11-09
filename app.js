const express = require('express');
const app = express();
const dotenv = require('dotenv').config()

const PORT = process.env.PORT;

// set the view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(PORT, ()=> {
    console.log(`Server is Listening to request at port ${PORT}`)
})