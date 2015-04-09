$(function() {
  $('body').on('click', function(event) {
    event.preventDefault();
    console.log(event);
  });

  require('socket.io')(80)    var socket = io.connect('http://localhost');
  console.log(socket);
  socket.on('connect', function () {
    console.log('Connected');
  });

  socket.on('something:happened', function(error) {
    console.log(error);
  });
});
