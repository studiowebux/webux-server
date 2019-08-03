require("dotenv").config();

const options = {
  ssl: {
    enabled: true,
    crt: process.env.CERT,
    key: process.env.KEY
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