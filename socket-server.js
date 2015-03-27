/**
 * Created by ETiV on 3/27/15.
 */

var net = require('net');
var fs = require('fs');
var SHOULD_EXIT = 'SHOULD_EXIT';
module.exports = function (path_socket, callback) {

  var server = net.createServer(function (connect) {
    connect.on('end', function () {
      // client disconnected

    });

    connect.on('data', function (data) {
      callback(null, data);
    });
  });


  server.on('error', function (e) {
    if (e.code == 'EADDRINUSE') {
      var clientSocket = new net.Socket();
      clientSocket.on('error', function (e) { // handle error trying to talk to server
        if (e.code == 'ECONNREFUSED') {  // No other server listening
          fs.unlinkSync(path_socket);
          server.listen(path_socket, function () { //'listening' listener
            console.log('Socket server [' + path_socket + '] recovered');
          });
        }
      });

      clientSocket.connect({path: path_socket}, function () {
        console.log('Socket server [' + path_socket + '] is running, giving up...');
        callback(SHOULD_EXIT);
      });
    }
  });

  server.listen(path_socket, function () {
    console.log('Socket server [' + path_socket + '] started ...');
  });
};

module.exports['SHOULD_EXIT'] = 'SHOULD_EXIT';
