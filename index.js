#!/usr/bin/env node

// ██████╗ ██╗███╗   ██╗ █████╗ ██████╗ ██╗   ██╗
// ██╔══██╗██║████╗  ██║██╔══██╗██╔══██╗╚██╗ ██╔╝
// ██████╔╝██║██╔██╗ ██║███████║██████╔╝ ╚████╔╝
// ██╔══██╗██║██║╚██╗██║██╔══██║██╔══██╗  ╚██╔╝
// ██████╔╝██║██║ ╚████║██║  ██║██║  ██║   ██║
// ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2018-07-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const header = require("./utils/header");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

let server = null;
let port;

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = port => {
  if (parseInt(port, 10) >= 0) {
    return parseInt(port, 10);
  }
  throw new Error("Invalid port !");
};

/**
 * Event listener for HTTP server "error" event.
 */

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      throw new Error(bind + " requires elevated privileges");
    case "EADDRINUSE":
      throw new Error(bind + " is already in use");
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.info("Listening on " + bind);
};

/**
 * Start an HTTP/HTTPS server.
 * @param {Object} options The configuration to start the server, mandatory
 * @param {Object} app An express application, mandatory
 * @param {Function} log The log function, optional, by default console
 * @return {Function} Start the server and return it.
 */
const CreateServer = (options, app, log = console) => {
  return new Promise((resolve, reject) => {
    try {
      if (!options || typeof options !== "object") {
        return reject(
          new Error("The options parameter is required and must be an object")
        );
      }
      if (!app || typeof app !== "function") {
        return reject(
          new Error("The app parameter is required and must be a function")
        );
      }
      if (log && typeof log !== "object") {
        return reject(new Error("The log parameter must be an object"));
      }

      if (options.clusterize && cluster.isMaster) {
        log.info(`Master ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
        }

        cluster.on("exit", (worker, code, signal) => {
          log.info(`worker ${worker.process.pid} died`);
        });
      } else {
        // Workers can share any TCP connection
        // In this case it is an HTTP server
        if (options.ssl.enabled) {
          log.info("Starting an HTTPS server ...");
          let key = Buffer.from(options.ssl.key, "base64").toString("ascii");
          let crt = Buffer.from(options.ssl.crt, "base64").toString("ascii");
          const sslOptions = {
            key: key,
            cert: crt
          };

          server = require("https").createServer(sslOptions, app);
        } else {
          log.info("Starting an HTTP server ...");
          server = require("http").createServer(app);
        }

        port = normalizePort(process.env.PORT || options.port);
        app.set("port", port);

        server.on("error", onError);
        server.on("listening", onListening);

        // Graceful shutdown
        process.on("SIGTERM", () => {
          server.close(err => {
            if (err) {
              return reject(err);
            }
            process.exit(0);
          });
        });

        // Start the server and print the Header
        server.listen(port, () => {
          header(options, app, log);
        });

        log.info(`Worker ${process.pid} started`);

        return resolve(server);
      }
    } catch (e) {
      throw e;
    }
  });
};

module.exports = { CreateServer };
