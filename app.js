/**
 * Created by ETiV on 3/27/15.
 */
var path = require('path');
var config = require('./config');
var httpServer = require('http').createServer();
var io = require('socket.io')(httpServer);
var libSocketServer = require('./socket-server');

var sockets = config['sockets'] || [];

if (typeof sockets == 'object' && sockets.hasOwnProperty('length') && typeof sockets.forEach == 'function') {

  sockets.forEach(function (socket) {

    var path_socket = path.join(__dirname, 'sockets', socket.name + '.socket');

    libSocketServer(path_socket, function (err, data) {
      if (err == libSocketServer.SHOULD_EXIT) {
        console.error('the socket is in use, program will exit ...');
        setTimeout(function () {
          process.exit();
        }, 100);

        return;
      }

      if (data) {
        if (io.sockets.sockets.length > 0) {
          io.sockets.emit('WEBLOG', {
            string: Buffer.isBuffer(data) ? data.toString('utf8') : data,
            socket: socket.name
          });
        }
      }
    });

  });

}

io.on('connection', function (socket) {
  console.log('new connection');
  socket.on('disconnect', function () {
    console.log('disconnected');
  });

  socket.on('req:sockets', function () {
    socket.emit('resp:sockets', sockets);
  });
});

httpServer.listen(config['socket.io']['port'], '127.0.0.1');
//process.on('exit', function () {
//  console.log('process is about to exit');
//});
//
//process.on('SIGTERM', function () {
//  console.log('process received SIGTERM');
//});
//process.on('SIGINT', function () {
//  console.log('process received SIGINT');
//});
