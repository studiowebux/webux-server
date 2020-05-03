require("dotenv").config();

const options = {
  ssl: {
    enabled: true,
    cert: process.env.CERT,
    key: process.env.KEY,
  },
  enterprise: "Studio Webux S.E.N.C",
  author: "Tommy Gingras",
  project: "@studiowebux/bin",
  version: require("../package.json")["version"],
  endpoint: "/api/v1",
  port: process.env.PORT || 1337,
};

const WebuxServer = require("../src/index");
const express = require("express");
const app = express();
const webuxServer = new WebuxServer(options, app, console);

app.set("node_env", process.env.NODE_ENV || "development");
app.set("port", process.env.PORT || 1337);

app.get("/", (req, res) => {
  return res.send({
    msg: "Bonjour !",
    env: app.get("node_env"),
    port: app.get("port"),
    pid: process.pid,
  });
});

webuxServer.StartServer();
