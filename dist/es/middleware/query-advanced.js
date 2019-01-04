"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _backo = _interopRequireDefault(require("backo"));

var _invariant = _interopRequireDefault(require("invariant"));

var _lodash = _interopRequireDefault(require("lodash.get"));

var _lodash2 = _interopRequireDefault(require("lodash.identity"));

var _lodash3 = _interopRequireDefault(require("lodash.includes"));

var _lodash4 = _interopRequireDefault(require("lodash.pick"));

var _lodash5 = _interopRequireDefault(require("lodash.pickby"));

var _actions = require("../actions");

var actionTypes = _interopRequireWildcard(require("../constants/action-types"));

var httpMethods = _interopRequireWildcard(require("../constants/http-methods"));

var statusCodes = _interopRequireWildcard(require("../constants/status-codes"));

var _queryKey4 = require("../lib/query-key");

var _update2 = require("../lib/update");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultConfig = {
  backoff: {
    maxAttempts: 5,
    minDuration: 300,
    maxDuration: 5000
  },
  retryableStatusCodes: [statusCodes.UNKNOWN, // normally means a failed connection
  statusCodes.REQUEST_TIMEOUT, statusCodes.TOO_MANY_REQUESTS, // hopefully backoff stops this getting worse
  statusCodes.SERVICE_UNAVAILABLE, statusCodes.GATEWAY_TIMEOUT],
  getQueryKey: _queryKey4.getQueryKey
};

var getPendingQueries = function getPendingQueries(queries) {
  return (0, _lodash5.default)(queries, function (query) {
    return query.isPending;
  });
};

var isStatusOK = function isStatusOK(status) {
  return status >= 200 && status < 300;
};

var queryMiddlewareAdvanced = function queryMiddlewareAdvanced(networkInterface) {
  return function (queriesSelector, entitiesSelector, customConfig) {
    return function (_ref) {
      var dispatch = _ref.dispatch,
          getState = _ref.getState;
      return function (next) {
        return function (action) {
          var returnValue;

          var _defaultConfig$custom = _objectSpread({}, defaultConfig, customConfig),
              getQueryKey = _defaultConfig$custom.getQueryKey,
              config = _objectWithoutProperties(_defaultConfig$custom, ["getQueryKey"]);

          switch (action.type) {
            case actionTypes.REQUEST_ASYNC:
              {
                var url = action.url,
                    body = action.body,
                    force = action.force,
                    retry = action.retry,
                    _action$transform = action.transform,
                    transform = _action$transform === void 0 ? _lodash2.default : _action$transform,
                    update = action.update,
                    _action$options = action.options,
                    options = _action$options === void 0 ? {} : _action$options,
                    meta = action.meta;
                (0, _invariant.default)(!!url, 'Missing required `url` field in action handler');
                (0, _invariant.default)(!!update, 'Missing required `update` field in action handler');
                var queryKey = getQueryKey(action);
                var state = getState();
                var queries = queriesSelector(state);
                var queriesState = queries[queryKey];
                var isPending = (0, _lodash.default)(queriesState, ['isPending']);
                var status = (0, _lodash.default)(queriesState, ['status']);
                var hasSucceeded = isStatusOK(status);

                if (force || !queriesState || retry && !isPending && !hasSucceeded) {
                  returnValue = new Promise(function (resolve) {
                    var start = new Date();
                    var _options$method = options.method,
                        method = _options$method === void 0 ? httpMethods.GET : _options$method;
                    var attempts = 0;
                    var backoff = new _backo.default({
                      min: config.backoff.minDuration,
                      max: config.backoff.maxDuration
                    });

                    var attemptRequest = function attemptRequest() {
                      var networkHandler = networkInterface(url, method, {
                        body: body,
                        headers: options.headers,
                        credentials: options.credentials
                      });
                      dispatch((0, _actions.requestStart)({
                        body: body,
                        meta: meta,
                        networkHandler: networkHandler,
                        queryKey: queryKey,
                        url: url
                      }));
                      attempts += 1;
                      networkHandler.execute(function (err, status, responseBody, responseText, responseHeaders) {
                        if ((0, _lodash3.default)(config.retryableStatusCodes, status) && attempts < config.backoff.maxAttempts) {
                          // TODO take into account Retry-After header if 503
                          setTimeout(attemptRequest, backoff.duration());
                          return;
                        }

                        var end = new Date();
                        var duration = end - start;
                        var transformed;
                        var newEntities;

                        if (action.unstable_preDispatchCallback) {
                          action.unstable_preDispatchCallback();
                        }

                        if (err || !isStatusOK(status)) {
                          dispatch((0, _actions.requestFailure)({
                            body: body,
                            duration: duration,
                            meta: meta,
                            queryKey: queryKey,
                            responseBody: responseBody,
                            responseHeaders: responseHeaders,
                            status: status,
                            responseText: responseText,
                            url: url
                          }));
                          resolve({
                            body: responseBody,
                            duration: duration,
                            status: status,
                            text: responseText,
                            headers: responseHeaders
                          });
                        } else {
                          var callbackState = getState();
                          var entities = entitiesSelector(callbackState);
                          transformed = transform(responseBody, responseText);
                          newEntities = (0, _update2.updateEntities)(update, entities, transformed);
                          dispatch((0, _actions.requestSuccess)({
                            body: body,
                            duration: duration,
                            meta: meta,
                            entities: newEntities,
                            queryKey: queryKey,
                            responseBody: responseBody,
                            responseHeaders: responseHeaders,
                            status: status,
                            responseText: responseText,
                            url: url
                          }));
                          resolve({
                            body: responseBody,
                            duration: duration,
                            status: status,
                            text: responseText,
                            transformed: transformed,
                            entities: newEntities,
                            headers: responseHeaders
                          });
                        }
                      });
                    };

                    attemptRequest();
                  });
                }

                break;
              }

            case actionTypes.MUTATE_ASYNC:
              {
                var _url = action.url,
                    _action$transform2 = action.transform,
                    _transform = _action$transform2 === void 0 ? _lodash2.default : _action$transform2,
                    _update = action.update,
                    rollback = action.rollback,
                    _body = action.body,
                    optimisticUpdate = action.optimisticUpdate,
                    _action$options2 = action.options,
                    _options = _action$options2 === void 0 ? {} : _action$options2,
                    _meta = action.meta;

                (0, _invariant.default)(!!_url, 'Missing required `url` field in action handler');
                var initialState = getState();
                var initialEntities = entitiesSelector(initialState);
                var optimisticEntities;

                if (optimisticUpdate) {
                  optimisticEntities = (0, _update2.optimisticUpdateEntities)(optimisticUpdate, initialEntities);
                }

                var _queryKey = getQueryKey(action);

                returnValue = new Promise(function (resolve) {
                  var start = new Date();
                  var _options$method2 = _options.method,
                      method = _options$method2 === void 0 ? httpMethods.POST : _options$method2;
                  var networkHandler = networkInterface(_url, method, {
                    body: _body,
                    headers: _options.headers,
                    credentials: _options.credentials
                  }); // Note: only the entities that are included in `optimisticUpdate` will be passed along in the
                  // `mutateStart` action as `optimisticEntities`

                  dispatch((0, _actions.mutateStart)({
                    body: _body,
                    meta: _meta,
                    networkHandler: networkHandler,
                    optimisticEntities: optimisticEntities,
                    queryKey: _queryKey,
                    url: _url
                  }));
                  networkHandler.execute(function (err, status, responseBody, responseText, responseHeaders) {
                    var end = new Date();
                    var duration = end - start;
                    var state = getState();
                    var entities = entitiesSelector(state);
                    var transformed;
                    var newEntities;

                    if (err || !isStatusOK(status)) {
                      var rolledBackEntities;

                      if (optimisticUpdate) {
                        rolledBackEntities = (0, _update2.rollbackEntities)(rollback, (0, _lodash4.default)(initialEntities, Object.keys(optimisticEntities)), (0, _lodash4.default)(entities, Object.keys(optimisticEntities)));
                      }

                      dispatch((0, _actions.mutateFailure)({
                        body: _body,
                        duration: duration,
                        meta: _meta,
                        queryKey: _queryKey,
                        responseBody: responseBody,
                        responseHeaders: responseHeaders,
                        status: status,
                        responseText: responseText,
                        rolledBackEntities: rolledBackEntities,
                        url: _url
                      }));
                      resolve({
                        body: responseBody,
                        duration: duration,
                        status: status,
                        text: responseText,
                        headers: responseHeaders
                      });
                    } else {
                      transformed = _transform(responseBody, responseText);
                      newEntities = (0, _update2.updateEntities)(_update, entities, transformed);
                      dispatch((0, _actions.mutateSuccess)({
                        url: _url,
                        body: _body,
                        duration: duration,
                        status: status,
                        entities: newEntities,
                        queryKey: _queryKey,
                        responseBody: responseBody,
                        responseText: responseText,
                        responseHeaders: responseHeaders,
                        meta: _meta
                      }));
                      resolve({
                        body: responseBody,
                        duration: duration,
                        status: status,
                        text: responseText,
                        transformed: transformed,
                        entities: newEntities,
                        headers: responseHeaders
                      });
                    }
                  });
                });
                break;
              }

            case actionTypes.CANCEL_QUERY:
              {
                var _queryKey2 = action.queryKey;
                (0, _invariant.default)(!!_queryKey2, 'Missing required `queryKey` field in action handler');

                var _state = getState();

                var _queries = queriesSelector(_state);

                var pendingQueries = getPendingQueries(_queries);

                if (_queryKey2 in pendingQueries) {
                  pendingQueries[_queryKey2].networkHandler.abort();

                  returnValue = next(action);
                } else {
                  console.warn('Trying to cancel a request that is not in flight: ', _queryKey2);
                  returnValue = null;
                }

                break;
              }

            case actionTypes.RESET:
              {
                var _state2 = getState();

                var _queries2 = queriesSelector(_state2);

                var _pendingQueries = getPendingQueries(_queries2);

                for (var _queryKey3 in _pendingQueries) {
                  if (_pendingQueries.hasOwnProperty(_queryKey3)) {
                    _pendingQueries[_queryKey3].networkHandler.abort();
                  }
                }

                returnValue = next(action);
                break;
              }

            default:
              {
                returnValue = next(action);
              }
          }

          return returnValue;
        };
      };
    };
  };
};

var _default = queryMiddlewareAdvanced;
exports.default = _default;