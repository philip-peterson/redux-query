"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _propTypes.default.shape({
  subscribe: _propTypes.default.func.isRequired,
  dispatch: _propTypes.default.func.isRequired,
  getState: _propTypes.default.func.isRequired
});

exports.default = _default;