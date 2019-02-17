var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var array = [];

http.listen(4000, () => {
  console.log('listening:');
});

io.on('connection', (socket) => {
  //console.log('test', socket);
  console.log(`Socket ${socket.id} connected.`);

  socket.on('start', (position) => {
    position.id = socket.id;
    array.push(position);
    //socket.emit('newPlayer', socket.id);
    io.sockets.connected[socket.id].emit('newPlayer', socket.id);
    socket.emit('position', position);
  });

  socket.on('update', (data) => {
    for(var i = 0; i <= array.length; i++){

    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected.`);
  });

});



// function createWindow () {
//   console.log('serverss');
// }
//
// app.on('ready', createWindow);
