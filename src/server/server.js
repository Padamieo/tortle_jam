var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
console.log('adasd');

http.listen(4000, () => {
  console.log('listening:');
});

io.on('connection', (a) => {
  console.log('connected');
  // console.log(a);
  // io.on('show', (b) => {
  //   console.log('show');
  //   console.log(b);
  // });

});



// function createWindow () {
//   console.log('serverss');
// }
//
// app.on('ready', createWindow);
