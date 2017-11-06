var express = require('express')
var path = require('path')
var app = express()
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const port = process.env.port || 10000
app.use(express.static(path.join(__dirname + 'public')));
app.use(express.static(path.join(__dirname + 'node_modules')));


app.get('/', function(req, res,next) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

io.on('connection', function(socket) {
    console.log('Client connected...')

    socket.emit('message-from-server', {
        message: 'Hello World from server'
    });

    socket.on('message-from-client', function (msg) {
        console.log('Message: ' + msg.message)
    });
})

server.listen(port, ()=> console.log(`Server started running on port: ${port}`))