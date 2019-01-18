var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var array = [];

http.listen(4000, () => {
  console.log('listening:');
});

io.on('connection', (socket) => {
  console.log('connected');
  // console.log(a);
  socket.on('started', (position) => {
    array.push(position);
    // console.log('show');
    // console.log(b);
    socket.emit('update', array);
  });



});



// function createWindow () {
//   console.log('serverss');
// }
//
// app.on('ready', createWindow);
