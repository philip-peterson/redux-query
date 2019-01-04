"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var actionTypes = _interopRequireWildcard(require("../constants/action-types"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {};

var queries = function queries() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actionTypes.RESET:
      {
        return {};
      }

    case actionTypes.MUTATE_START:
    case actionTypes.REQUEST_START:
      {
        var queryKey = action.queryKey;
        return _objectSpread({}, state, _defineProperty({}, queryKey, {
          url: action.url,
          isFinished: false,
          isPending: true,
          networkHandler: action.networkHandler,
          isMutation: action.type === actionTypes.MUTATE_START,
          queryCount: state[queryKey] ? state[queryKey].queryCount + 1 : 1
        }));
      }

    case actionTypes.REQUEST_SUCCESS:
    case actionTypes.MUTATE_FAILURE:
    case actionTypes.MUTATE_SUCCESS:
    case actionTypes.REQUEST_FAILURE:
      {
        var _queryKey = action.queryKey;
        return _objectSpread({}, state, _defineProperty({}, _queryKey, _objectSpread({}, state[_queryKey], {
          isFinished: true,
          isPending: false,
          lastUpdated: action.time,
          status: action.status,
          headers: action.responseHeaders
        })));
      }

    case actionTypes.CANCEL_QUERY:
      {
        var _queryKey2 = action.queryKey;

        if (state[_queryKey2].isPending) {
          // Make sure query is actually pending
          return _objectSpread({}, state, _defineProperty({}, _queryKey2, _objectSpread({}, state[_queryKey2], {
            isFinished: true,
            isPending: false,
            status: 0
          })));
        }

        return state;
      }

    default:
      {
        return state;
      }
  }
};

var _default = queries;
exports.default = _default;