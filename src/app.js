const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./model/User');
const redisClient = require('./config/redis');

app.use(express.json());    

const clients = new Set();

// custom basic  auth handler for all routes 
app.use("/", (req, res, next) => {
    console.log('auth middleware')
    const token = 'xyz';
    const authHeader = 'xyz';
    if (token === authHeader) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
});

// crud methods for user collection 
app.post('/signup', async (req, res) => {
   const obj = req.body;
    const user = new User(obj);
    try {
        await user.save();
        res.send('user created succesfully')
    } catch(err) {
        console.log(err);
    } 
});

// get all 
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});



app.get('/events', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    const clientId = Date.now();
    const client = {id: clientId, response: res}
    clients.add(client);

    req.on('close', () => {
        clients.delete(client);
    });

});

app.get('/sendeventclient', (req, res) => {
    
    const response = 'suraj sent message';
    clients.forEach(client => {
        client.response.write(`data: ${JSON.stringify({ response })}\n\n`);
    });

    res.send({success: true});
});


// get one 


// get one by id

// patch one by id
app.patch('/users', async (req, res) => {
    const {userId} = req.body;
    await User.findByIdAndUpdate(userId, req.body);

    res.send('user updated Successfully');
});

// delete one by id
app.delete('/users', async (req, res) => {
    const {userId} = req.body;
    await User.findByIdAndDelete(userId);

    res.send('user deleted Successfully');
});

app.get("/getdata", (req, res) => {
    res.send('Hello World');
})

// 
app.get("/getdataerror", (req, res) => {
    throw new Error('This is a forced error');
    res.send('Hello World');
})

app.use("/", async (req, res) => {
    redisClient.set('suraj', 'value');
    console.log('Value set in redis');
    res.send('Inital Page for all');
});

// for sure write 4 parameters for error handling 
// custom error handler for all routes 
app.use("/", (err, req, res, next) => {
    res.status(500).send('Internal Server Error');
});


app.listen(8991, () => {
    console.log('Server is running on port 7080');
    connectDB().then(() => {
        console.log('Connected to MongoDB');
    });
});