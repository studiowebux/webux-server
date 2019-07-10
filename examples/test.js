const options = {
  ssl: {
    enabled: false,
    key: "", // absolute path
    crt: "" // absolute path
  },
  enterprise: "Studio Webux S.E.N.C",
  author: "Tommy Gingras",
  project: "Webux-bin",
  version: require("./package.json")["version"],
  endpoint: "/api/v1",
  port: 1337
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
