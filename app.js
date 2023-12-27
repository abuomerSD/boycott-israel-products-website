const express = require('express');
const app = express();
require('dotenv').config()
const productRouter = require('./routes/productRoute');

const PORT = process.env.PORT;

// set the view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

// to be sure the application will accept json
app.use(express.json());

app.use('/products', productRouter);

app.listen(PORT, ()=> {
    console.log(`Server is Listening to request at port ${PORT}`)
})