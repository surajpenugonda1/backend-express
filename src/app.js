const express = require('express');
const app = express();
const connectDB = require('./config/database');

const User = require('./model/User');


// custom basic  auth handler for all routes 
app.use("/", (req, res, next) => {
    const token = 'xyz';
    const authHeader = 'xyz';
    if (token === authHeader) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.post('/signup', async (req, res) => {
   const obj = {
    firstName: 'suraj',
    lastName: 'penugonda',
    email: 'suraj@gmail.com',
    age: 25,
    geneder: 'male'
   };

    const user = new User(obj);
    try {
        await user.save();
        res.send('user created succesfully')
    } catch(err) {
        console.log(err);
    } 
});

app.get("/getdata", (req, res) => {
    res.send('Hello World');
})

// 
app.get("/getdataerror", (req, res) => {
    throw new Error('This is a forced error');
    res.send('Hello World');
})

app.use("/", (req, res) => {
    res.send('Inital Page for all');
});

// for sure write 4 parameters for error handling 
// custom error handler for all routes 
app.use("/", (err, req, res, next) => {
    res.status(500).send('Internal Server Error');
});


app.listen(7081, () => {
    console.log('Server is running on port 7080');
    connectDB().then(() => {
        console.log('Connected to MongoDB');
    });
});