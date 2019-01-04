"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryKey = void 0;

var _jsonStableStringify = _interopRequireDefault(require("json-stable-stringify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getQueryKey = function getQueryKey(_ref) {
  var url = _ref.url,
      body = _ref.body,
      queryKey = _ref.queryKey;

  if (queryKey !== null && queryKey !== undefined) {
    return queryKey;
  } else {
    return (0, _jsonStableStringify.default)({
      url: url,
      body: body
    });
  }
};

exports.getQueryKey = getQueryKey;