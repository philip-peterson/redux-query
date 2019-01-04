"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _queryAdvanced = _interopRequireDefault(require("./query-advanced.js"));

var _superagent = _interopRequireDefault(require("../network-interfaces/superagent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queryMiddleware = (0, _queryAdvanced.default)(_superagent.default);
var _default = queryMiddleware;
exports.default = _default;