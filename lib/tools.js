/**
 * File: tools.js
 * Author: Tommy Gingras
 * Date: 2019-08-03
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

/**
 * try another port to start the server.
 * @public
 * @param {Number} port The actual port, Mandatory
 * @return {Number} The new port
 */
const changePort = port => {
  if (port + 1 <= 65535 && port + 1 > 0) {
    return (port += 1);
  } else {
    throw new Error(
      "Invalid port value must be between 0-65535, got " + port + 1
    );
  }
};

module.exports = {
  changePort
};
