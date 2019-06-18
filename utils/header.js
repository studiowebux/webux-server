// ██╗  ██╗███████╗ █████╗ ██████╗ ███████╗██████╗
// ██║  ██║██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
// ███████║█████╗  ███████║██║  ██║█████╗  ██████╔╝
// ██╔══██║██╔══╝  ██╔══██║██║  ██║██╔══╝  ██╔══██╗
// ██║  ██║███████╗██║  ██║██████╔╝███████╗██║  ██║
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝

/**
 * File: header.js
 * Author: Tommy Gingras
 * Date: 2018-07-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

module.exports = (app, log, options) => {
  log.info("Application started with success.");
  log.info("Version : " + options.version);
  log.info("Author: " + options.author + " | " + options.enterprise);
  log.info(
    "Project : " +
      options.project +
      " is listening on port " +
      app.get("port") +
      "..."
  );
  log.info("RESTFUL API accessible from : " + options.version);
  log.info("Mode : " + app.get("env"));
  Webux.log.info("Working Path : " + process.cwd());
};
