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

/**
 * Print server information on the console.
 * @public
 * @param {Object} options The configuration to start the server, mandatory
 * @param {Object} app An express application, mandatory
 * @param {Function} log The log function, optional, by default console
 * @return {VoidFunction} Only print details on the console.
 */
module.exports = (options, app, log = console) => {
  log.info(
    `/****************************************************************/`
  );
  log.info(`/* Application started with success.`);
  log.info(`/* Version : ${options.version}`);
  log.info(`/* Author: ${options.author} | ${options.enterprise}`);
  log.info(
    `/* Project : ${options.project} is listening on port ${app.get("port")}`
  );
  log.info(`/* RESTFUL API accessible from : ${options.endpoint}`);
  log.info(`/* Mode : ${app.get("env")}`);
  log.info(`/* Working Path : ${process.cwd()}`);
  log.info(
    `/****************************************************************/`
  );
};
