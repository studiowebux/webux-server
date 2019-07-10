# Webux-server

This module allows to start a NodeJS server using http or https,  
you have to specify an app, a custom logger (if you have one) and some options.

# Installation

```bash
npm i --save webux-server
```

# Usage

This example is using the console from nodeJS with an HTTP server.  

```
const options = {
  ssl: {
    enabled: false,
    key: "", // absolute path
    crt: "" // absolute path
  },
  enterprise: "Studio Webux S.E.N.C",
  author: "Tommy Gingras",
  project: "Webux-bin",
  version: require('./package.json')['version'],
  endpoint: "/api/v1",
  port: 1337
};

const webuxserver = require("../index");
const express = require("express");
const app = express();

app.set('env', "development");
app.set('port', 1337);

app.get("/", (req, res) => {
  return res.success({
    msg: "Bonjour !"
  });
});

webuxserver(options, app); // start the server
```

OUTPUT:  
```bash
Starting an HTTP server ...
Listening on port 1337
Application started with success.
Version : 1.0.0
Author: Tommy Gingras | Studio Webux S.E.N.C
Project : Webux-bin is listening on port 1337...
RESTFUL API accessible from : /api/v1
Mode : development
Working Path : /Users/tgingras/Documents/Studiowebux/webux-server/examples
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
SEE LICENSE IN license.txt