"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.omit"));

var _actionTypes = require("../constants/action-types");

var _update = require("../lib/update");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var initialState = {};

var withoutPath = function withoutPath(state, path) {
  var _path = _toArray(path),
      key = _path[0],
      restPath = _path.slice(1);

  if (restPath.length) {
    return _objectSpread({}, state, _defineProperty({}, key, withoutPath(state[key], restPath)));
  } else {
    return (0, _lodash.default)(state, key);
  }
};

var entities = function entities() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === _actionTypes.RESET) {
    return 'entities' in action ? action.entities : initialState;
  } else if (action.type === _actionTypes.MUTATE_START && action.optimisticEntities) {
    return _objectSpread({}, state, action.optimisticEntities);
  } else if (action.type === _actionTypes.MUTATE_FAILURE && action.rolledBackEntities) {
    return _objectSpread({}, state, action.rolledBackEntities);
  } else if (action.type === _actionTypes.REQUEST_SUCCESS || action.type === _actionTypes.MUTATE_SUCCESS) {
    return _objectSpread({}, state, action.entities);
  } else if (action.type === _actionTypes.UPDATE_ENTITIES) {
    return _objectSpread({}, state, (0, _update.optimisticUpdateEntities)(action.update, state));
  } else {
    return state;
  }
};

var _default = entities;
exports.default = _default;