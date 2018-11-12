const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb://vini:vini123@ds253713.mlab.com:53713/tweetsgoweek', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes.js'));

server.listen(3000, () => {
    console.log("servidor ligado");
});