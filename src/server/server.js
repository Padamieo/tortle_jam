var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var turtles = [];
var fruits = [];
var avaliable = [5,6];

function createFruit(){

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

http.listen(4000, () => {
  console.log('listening:');
});

io.on('connection', (socket) => {
  //console.log('test', socket);
  console.log(`Socket ${socket.id} connected.`);

  socket.on('start', (position) => {
    position.id = socket.id;
    turtles.push(position);

    if(fruits.length <= 0){
      fruits.push({id:1,x:getRandomInt(1000),y:getRandomInt(1000)});
      fruits.push({id:2,x:getRandomInt(1000),y:getRandomInt(1000)});
      fruits.push({id:3,x:getRandomInt(1000),y:getRandomInt(1000)});
      fruits.push({id:4,x:getRandomInt(1000),y:getRandomInt(1000)});
    }
    console.log(turtles.length);
    io.sockets.connected[socket.id].emit('setup', socket.id, fruits, turtles);
    socket.emit('player', position);
  });

  socket.on('eaten', (fruitId, playerId) => {
    console.log('eat', fruitId, playerId);
    var index = fruits.findIndex(fruit => fruit.id === fruitId);
    console.log('avaliable', avaliable, index);
    avaliable.push(index);
    console.log('avaliable', avaliable);
    fruits.splice(index, 1);
    var n = avaliable.shift();
    console.log('avaliable', avaliable, n);
    fruits.push({id:n,x:getRandomInt(1000),y:getRandomInt(1000)});
    //renive old fruit
    //fruits.push({id:5, x:400,y:400});
    //socket.emit('fruit', {id:5, x:400,y:400});
  });

  // socket.on('update', (data) => {
  //   for(var i = 0; i <= turtles.length; i++){
  //
  //   }
  // });

  socket.on('update', (data) => {
    turtles.filter((turtle) => {
      if(data.id === turtle.id){
        turtle.x = data.x;
        turtle.y = data.y;
      }
    });
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
