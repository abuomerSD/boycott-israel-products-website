const express = require('express');
const app = express();
require('dotenv').config();
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');
const { init } = require('./database/databaseHandler');

const PORT = process.env.PORT;

// set the view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

// to be sure the application will accept json
app.use(express.json());

// createing the database and tables
init();

// handling the routes
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use((req, res)=> {
    res.send('404 Page Not Found');
})

app.listen(PORT, ()=> {
    console.log(`Server is Listening to request at port ${PORT}`)
})