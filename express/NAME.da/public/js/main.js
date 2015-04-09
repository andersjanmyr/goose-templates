$(function() {
  $('body').on('click', function(event) {
    event.preventDefault();
    console.log(event);
  });

  var socket = io();
  socket.on('connect', function () {
    console.log('Connected');
  });

  socket.on('something:happened', function(error) {
    console.log(error);
  });

});
