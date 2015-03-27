logcat-socket.io
----

Project `logcat-socket.io` uses `nc` command to redirect output from server's console to web front-end.

### Requiement:

* nodejs / npm
* nc
* nginx (optional)

### Usage:

Clone this repo, execute `npm install` from the project's directory.

If you use `nginx`, the following will be helpful:

```
server {
  listen 80;
  server_name SERVER_NAME_PLACEHOLDER;
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

### config.js

This file controls how many sockets listener should be there, and its style.





