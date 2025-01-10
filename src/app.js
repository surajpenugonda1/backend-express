const express = require('express');
const app = express();

app.use("/", (req, res) => {
    res.send('Hello World');
})


app.listen(7080, () => {
    console.log('Server is running on port 7080');
});