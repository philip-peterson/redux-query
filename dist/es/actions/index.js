"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEntities = exports.cancelQuery = exports.mutateAsync = exports.requestAsync = exports.mutateFailure = exports.mutateSuccess = exports.mutateStart = exports.requestFailure = exports.requestSuccess = exports.requestStart = void 0;

var actionTypes = _interopRequireWildcard(require("../constants/action-types"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var requestStart = function requestStart(_ref) {
  var body = _ref.body,
      meta = _ref.meta,
      networkHandler = _ref.networkHandler,
      queryKey = _ref.queryKey,
      url = _ref.url;
  return {
    type: actionTypes.REQUEST_START,
    url: url,
    body: body,
    networkHandler: networkHandler,
    meta: meta,
    queryKey: queryKey
  };
};

exports.requestStart = requestStart;

var requestSuccess = function requestSuccess(_ref2) {
  var body = _ref2.body,
      duration = _ref2.duration,
      entities = _ref2.entities,
      meta = _ref2.meta,
      queryKey = _ref2.queryKey,
      responseBody = _ref2.responseBody,
      responseHeaders = _ref2.responseHeaders,
      responseText = _ref2.responseText,
      status = _ref2.status,
      url = _ref2.url;
  return {
    type: actionTypes.REQUEST_SUCCESS,
    url: url,
    body: body,
    duration: duration,
    status: status,
    entities: entities,
    responseBody: responseBody,
    responseText: responseText,
    responseHeaders: responseHeaders,
    meta: meta,
    queryKey: queryKey,
    time: Date.now()
  };
};

exports.requestSuccess = requestSuccess;

var requestFailure = function requestFailure(_ref3) {
  var body = _ref3.body,
      duration = _ref3.duration,
      meta = _ref3.meta,
      queryKey = _ref3.queryKey,
      responseBody = _ref3.responseBody,
      responseHeaders = _ref3.responseHeaders,
      responseText = _ref3.responseText,
      status = _ref3.status,
      url = _ref3.url;
  return {
    type: actionTypes.REQUEST_FAILURE,
    url: url,
    body: body,
    duration: duration,
    status: status,
    responseBody: responseBody,
    responseText: responseText,
    responseHeaders: responseHeaders,
    meta: meta,
    queryKey: queryKey,
    time: Date.now()
  };
};

exports.requestFailure = requestFailure;

var mutateStart = function mutateStart(_ref4) {
  var body = _ref4.body,
      meta = _ref4.meta,
      networkHandler = _ref4.networkHandler,
      optimisticEntities = _ref4.optimisticEntities,
      queryKey = _ref4.queryKey,
      url = _ref4.url;
  return {
    type: actionTypes.MUTATE_START,
    url: url,
    body: body,
    networkHandler: networkHandler,
    optimisticEntities: optimisticEntities,
    queryKey: queryKey,
    meta: meta
  };
};

exports.mutateStart = mutateStart;

var mutateSuccess = function mutateSuccess(_ref5) {
  var body = _ref5.body,
      duration = _ref5.duration,
      entities = _ref5.entities,
      meta = _ref5.meta,
      queryKey = _ref5.queryKey,
      responseBody = _ref5.responseBody,
      responseHeaders = _ref5.responseHeaders,
      responseText = _ref5.responseText,
      status = _ref5.status,
      url = _ref5.url;
  return {
    type: actionTypes.MUTATE_SUCCESS,
    url: url,
    body: body,
    duration: duration,
    status: status,
    responseBody: responseBody,
    responseText: responseText,
    responseHeaders: responseHeaders,
    entities: entities,
    queryKey: queryKey,
    time: Date.now(),
    meta: meta
  };
};

exports.mutateSuccess = mutateSuccess;

var mutateFailure = function mutateFailure(_ref6) {
  var body = _ref6.body,
      duration = _ref6.duration,
      meta = _ref6.meta,
      queryKey = _ref6.queryKey,
      responseBody = _ref6.responseBody,
      responseHeaders = _ref6.responseHeaders,
      responseText = _ref6.responseText,
      rolledBackEntities = _ref6.rolledBackEntities,
      status = _ref6.status,
      url = _ref6.url;
  return {
    type: actionTypes.MUTATE_FAILURE,
    url: url,
    body: body,
    duration: duration,
    status: status,
    responseBody: responseBody,
    responseText: responseText,
    responseHeaders: responseHeaders,
    rolledBackEntities: rolledBackEntities,
    queryKey: queryKey,
    time: Date.now(),
    meta: meta
  };
};

exports.mutateFailure = mutateFailure;

var requestAsync = function requestAsync(_ref7) {
  var body = _ref7.body,
      force = _ref7.force,
      meta = _ref7.meta,
      options = _ref7.options,
      queryKey = _ref7.queryKey,
      retry = _ref7.retry,
      transform = _ref7.transform,
      update = _ref7.update,
      url = _ref7.url,
      unstable_preDispatchCallback = _ref7.unstable_preDispatchCallback;
  return {
    type: actionTypes.REQUEST_ASYNC,
    body: body,
    force: force,
    queryKey: queryKey,
    meta: meta,
    options: options,
    retry: retry,
    transform: transform,
    update: update,
    url: url,
    unstable_preDispatchCallback: unstable_preDispatchCallback
  };
};

exports.requestAsync = requestAsync;

var mutateAsync = function mutateAsync(_ref8) {
  var body = _ref8.body,
      meta = _ref8.meta,
      optimisticUpdate = _ref8.optimisticUpdate,
      options = _ref8.options,
      queryKey = _ref8.queryKey,
      rollback = _ref8.rollback,
      transform = _ref8.transform,
      update = _ref8.update,
      url = _ref8.url;
  return {
    type: actionTypes.MUTATE_ASYNC,
    body: body,
    meta: meta,
    optimisticUpdate: optimisticUpdate,
    options: options,
    queryKey: queryKey,
    rollback: rollback,
    transform: transform,
    update: update,
    url: url
  };
};

exports.mutateAsync = mutateAsync;

var cancelQuery = function cancelQuery(queryKey) {
  return {
    type: actionTypes.CANCEL_QUERY,
    queryKey: queryKey
  };
};

exports.cancelQuery = cancelQuery;

var updateEntities = function updateEntities(update) {
  return {
    type: actionTypes.UPDATE_ENTITIES,
    update: update
  };
};

exports.updateEntities = updateEntities;