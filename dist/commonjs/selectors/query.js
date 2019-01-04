"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryCount = exports.lastUpdated = exports.headers = exports.status = exports.isPending = exports.isFinished = void 0;

var _lodash = _interopRequireDefault(require("lodash.get"));

var _queryKey = require("../lib/query-key");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isFinished = function isFinished(queriesState, queryConfig) {
  if (queryConfig) {
    var queryKey = (0, _queryKey.getQueryKey)(queryConfig);
    return (0, _lodash.default)(queriesState, [queryKey, 'isFinished']);
  }
};

exports.isFinished = isFinished;

var isPending = function isPending(queriesState, queryConfig) {
  if (queryConfig) {
    var queryKey = (0, _queryKey.getQueryKey)(queryConfig);
    return (0, _lodash.default)(queriesState, [queryKey, 'isPending']);
  }
};

exports.isPending = isPending;

var status = function status(queriesState, queryConfig) {
  if (queryConfig) {
    var queryKey = (0, _queryKey.getQueryKey)(queryConfig);
    return (0, _lodash.default)(queriesState, [queryKey, 'status']);
  }
};

exports.status = status;

var headers = function headers(queriesState, queryConfig) {
  if (queryConfig) {
    var queryKey = (0, _queryKey.getQueryKey)(queryConfig);
    return (0, _lodash.default)(queriesState, [queryKey, 'headers']);
  }
};

exports.headers = headers;

var lastUpdated = function lastUpdated(queriesState, queryConfig) {
  if (queryConfig) {
    var queryKey = (0, _queryKey.getQueryKey)(queryConfig);
    return (0, _lodash.default)(queriesState, [queryKey, 'lastUpdated']);
  }
};

exports.lastUpdated = lastUpdated;

var queryCount = function queryCount(queriesState, queryConfig) {
  if (queryConfig) {
    var queryKey = (0, _queryKey.getQueryKey)(queryConfig);
    return (0, _lodash.default)(queriesState, [queryKey, 'queryCount']);
  }
};

exports.queryCount = queryCount;