"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GATEWAY_TIMEOUT = exports.SERVICE_UNAVAILABLE = exports.TOO_MANY_REQUESTS = exports.REQUEST_TIMEOUT = exports.UNKNOWN = void 0;
var UNKNOWN = 0;
exports.UNKNOWN = UNKNOWN;
var REQUEST_TIMEOUT = 408; // client took too long

exports.REQUEST_TIMEOUT = REQUEST_TIMEOUT;
var TOO_MANY_REQUESTS = 429;
exports.TOO_MANY_REQUESTS = TOO_MANY_REQUESTS;
var SERVICE_UNAVAILABLE = 503;
exports.SERVICE_UNAVAILABLE = SERVICE_UNAVAILABLE;
var GATEWAY_TIMEOUT = 504;
exports.GATEWAY_TIMEOUT = GATEWAY_TIMEOUT;