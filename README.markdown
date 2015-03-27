logcat-socket.io
----

Project `logcat-socket.io` uses `nc` command to redirect output from server's console to web front-end.

### Requiement:

* nodejs / npm
* nc: netcat
* nginx (optional)

### Usage:

Clone this repo, execute `npm install` from the project's directory.


#### nginx

If you use `nginx`, the following will be helpful:

```
server {
  listen 80;
  server_name your.domain-name.com;
  root PATH_TO_PROJECT/public;
  index index.html;

  location /socket.io/ {
    proxy_pass http://127.0.0.1:3080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

#### config.js

This file controls how many socket listener should be there, and its style ( the color shown on the webpage ).

The `name` of each `socket` item will be used to create UNIX socket under the directory `PROJECT/sockets/`.

#### Start Up

After editing `config.js`, use `node app.js` to start the service.

Then you should navigate to the webpage `http://your.domain-name.com/index.html`.

Choosing the socket by clicking the its `name`, will toggle the output state.

#### nc

Command `nc` can write to the UNIX socket if the argument `-U` is given.

The most easy way to test whether the service is working, is just run
```
echo 'Hello World' | nc -U 'PATH_TO_PROJECT/sockets/SOCKET_NAME.socket'
```

EOF

