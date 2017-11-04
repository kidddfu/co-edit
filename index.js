var express = require('express');
var app = express();
var http = require('http').createServer(app);
var port = process.env.PORT || 3000;

app.set('views','./views/pages');
app.set('view engine', 'jade');

var io = require('socket.io')(http);

var body = "type here";
io.on('connection', function(socket){
    socket.emit('refresh', {
        body: body
    });
    console.log("user connnected!");
    socket.on('disconnect', function(){
        console.log("user left!");
    });

    socket.on('change', function(op){
        console.log(op);
        if(op.origin == '+input' || op.origin == 'paste' || op.origin == '+delete'){
            socket.broadcast.emit('change', op);
        }
    });
    
});

http.listen(port, function(){
    console.log('Server listening at port %d', port);
});

app.get('/', function(req, res){
    res.render('index', {title: 'coedit'});
});

