const { CreateServer } = require("../../index");
const express = require("express");
const app = express();

function Core() {
  this.config = {
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
    clusterize: true,
    cores: 4
  };

  this.express = express;
  this.app = app;

  this.startServer = CreateServer(this.config, this.app, console);
}

module.exports = Core;
