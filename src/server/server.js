var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var turtles = [];
var fruits = [];

http.listen(4000, () => {
  console.log('listening:');
});

io.on('connection', (socket) => {
  //console.log('test', socket);
  console.log(`Socket ${socket.id} connected.`);

  socket.on('start', (position) => {
    position.id = socket.id;
    turtles.push(position);
    if(fruits.length >= 0){
      fruits.push({x:0,y:0});
      fruits.push({x:0,y:1000});
      fruits.push({x:1000,y:0});
      fruits.push({x:1000,y:1000});
    }
    io.sockets.connected[socket.id].emit('setup', socket.id, fruits, turtles);
    socket.emit('player', position);
  });

  socket.on('update', (data) => {
    for(var i = 0; i <= turtles.length; i++){

    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected.`);
    /*
    var disconnects = [];
    if(turtles.length !== 0 || turtles.length !== null){
      for (var i = 0; i < turtles.length; i++) {
        console.log(turtles[i]);
        if(turtles[i] !== null && turtles[i].id !== undefined){
          if(io.sockets.connected[turtles[i].id] === undefined){
            disconnects.push(turtles[i].id);
            delete turtles[i];
          }
        }
      }

      socket.emit('disconnected', disconnects);
    }
    */
  });

});



// function createWindow () {
//   console.log('serverss');
// }
//
// app.on('ready', createWindow);
