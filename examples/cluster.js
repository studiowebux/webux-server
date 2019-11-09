const options = {
  ssl: {
    enabled: false,
    key: "",
    crt: ""
  },
  enterprise: "Studio Webux S.E.N.C",
  author: "Tommy Gingras",
  project: "@studiowebux/bin",
  version: require("./package.json")["version"],
  endpoint: "/api/v1",
  port: 1337,
  clusterize: false
};

const { CreateServer } = require("../index");
const express = require("express");
const app = express();

app.set("env", "development");
app.set("port", 1337);

app.get("/", (req, res) => {
  return res.send({
    msg: "Bonjour !"
  });
});

CreateServer(options, app); // start the server
