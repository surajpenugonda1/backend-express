const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://myAtlasDBUser:xxxxxx@myatlasclusteredu.og1zr.mongodb.net/devTinder');
}

module.exports = connectDB;
