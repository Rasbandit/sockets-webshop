const app = require('express')(),
  bodyParser = require('body-parser'),
  socket = require('socket.io'),
  port = 8080;

app.use(bodyParser.json());

const io = socket(app.listen(port, () => console.log(`listening on port ${port}`)));

io.on('connection', socket => {
  socket.on('blast message', input => {
    console.log('blast');
    io.sockets.emit('generate response', input);
  });
  socket.on('emit message', input => {
    console.log('emit');
    socket.emit('generate response', input);
  });
});
