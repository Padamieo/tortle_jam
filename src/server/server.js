/* eslint-disable no-console */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var turtles = [];
var fruits = [];

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
			fruits.push({id:1,x:500,y:500});
		}
		console.log(turtles.length);
		io.sockets.connected[socket.id].emit('setup', socket.id, fruits, turtles);
		socket.emit('player', position);
	});

	socket.on('eaten', (fruitId, playerId) => {
		console.log('eat', fruitId, playerId);
		var index = fruits.findIndex(fruit => fruit.id === fruitId);
		// if(index !== -1){
		//   console.log('avaliable', avaliable, index);
		//   avaliable.push(index);
		//   console.log('avaliable', avaliable);
		//   fruits.splice(index, 1);
		//   var n = avaliable.shift();
		//   console.log('avaliable', avaliable, n);
		//   var newFruit = {id:n,x:getRandomInt(1000),y:getRandomInt(1000)};
		//   fruits.push(newFruit);
		//   socket.emit('fruit', newFruit);
		// }
		return;
	});

	// socket.on('update', (data) => {
	//   for(var i = 0; i <= turtles.length; i++){
	//
	//   }
	// });

	socket.on('updateServer', (data) => {
		var updated = false;
		turtles.filter((turtle) => {
			if(data.id === turtle.id){
				turtle.x = data.x;
				turtle.y = data.y;
				updated = true;
			}
		});
		if(updated === true){
			socket.emit('updateClient', data);
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
