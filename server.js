// npm install express
//npm install socket.io
//npm install body-parser

//left off at 17:00 on lecture

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;
const app = express();

app.use(express.static(path.join(__dirname, 'client')));

const server = app.listen(port, () => console.log('listening on port' + port));
const io = require('socket.io')(server);

//make this global so it is shared among all the connections!
let count = 0

io.on('connection', socket => {

  console.log('Hello World');

  socket.on('buttonClicked', function(){
    numberUpdated(++count);
    //io.emit('numberUpdated', ++count);
  });

  socket.on('reset', function(){
    numberUpdated(count = 0);
    //count = 0;
    //io.emit('numberUpdated', count)
  });

  //emit the number so user sees updated (not zero) count when open webpage
  socket.emit('numberUpdated', count);
});

function numberUpdated(number){
  io.emit('numberUpdated', number);
}
