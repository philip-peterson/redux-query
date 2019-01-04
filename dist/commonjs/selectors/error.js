"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.responseHeaders = exports.responseText = exports.responseBody = void 0;

var _lodash = _interopRequireDefault(require("lodash.get"));

var _queryKey = require("../lib/query-key");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var responseBody = function responseBody(errorsState, queryConfig) {
  if (queryConfig) {
    var queryKey = (0, _queryKey.getQueryKey)(queryConfig);
    return (0, _lodash.default)(errorsState, [queryKey, 'responseBody']);
  }
};

exports.responseBody = responseBody;

var responseText = function responseText(errorsState, queryConfig) {
  if (queryConfig) {
    var queryKey = (0, _queryKey.getQueryKey)(queryConfig);
    return (0, _lodash.default)(errorsState, [queryKey, 'responseText']);
  }
};

exports.responseText = responseText;

var responseHeaders = function responseHeaders(errorsState, queryConfig) {
  if (queryConfig) {
    var queryKey = (0, _queryKey.getQueryKey)(queryConfig);
    return (0, _lodash.default)(errorsState, [queryKey, 'responseHeaders']);
  }
};

exports.responseHeaders = responseHeaders;