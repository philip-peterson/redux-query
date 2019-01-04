"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.difference"));

var _lodash2 = _interopRequireDefault(require("lodash.includes"));

var _lodash3 = _interopRequireDefault(require("lodash.intersection"));

var _react = _interopRequireDefault(require("react"));

var _actions = require("../actions");

var _queryKey = require("../lib/query-key");

var _shallowEqual = _interopRequireDefault(require("../lib/shallow-equal"));

var _storeShape = _interopRequireDefault(require("../lib/store-shape"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ensureArray = function ensureArray(maybe) {
  return Array.isArray(maybe) ? maybe : [maybe];
};

var diffConfigs = function diffConfigs(prevConfigs, configs) {
  var prevQueryKeys = prevConfigs.map(_queryKey.getQueryKey);
  var queryKeys = configs.map(_queryKey.getQueryKey);
  var intersect = (0, _lodash3.default)(prevQueryKeys, queryKeys);
  var cancelKeys = (0, _lodash.default)(prevQueryKeys, intersect);
  var requestKeys = (0, _lodash.default)(queryKeys, intersect);
  return {
    cancelKeys: cancelKeys,
    requestKeys: requestKeys
  };
};

var connectRequest = function connectRequest(mapPropsToConfigs) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (WrappedComponent) {
    var _options$pure = options.pure,
        pure = _options$pure === void 0 ? true : _options$pure,
        _options$withRef = options.withRef,
        withRef = _options$withRef === void 0 ? false : _options$withRef,
        _options$reduxContext = options.reduxContext,
        reduxContext = _options$reduxContext === void 0 ? null : _options$reduxContext;

    var ConnectRequestHOC =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(ConnectRequestHOC, _React$Component);

      function ConnectRequestHOC(props) {
        var _this;

        _classCallCheck(this, ConnectRequestHOC);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(ConnectRequestHOC).call(this, props));
        _this._wrappedInstance = null;
        return _this;
      }

      _createClass(ConnectRequestHOC, [{
        key: "getWrappedInstance",
        value: function getWrappedInstance() {
          if (this._wrappedInstance) {
            return this._wrappedInstance.getWrappedInstance();
          } else {
            return null;
          }
        }
      }, {
        key: "render",
        value: function render() {
          var _this2 = this;

          if (reduxContext) {
            var ReduxContext = reduxContext;
            return _react.default.createElement(ReduxContext.Consumer, null, function (_ref) {
              var store = _ref.store;
              return _react.default.createElement(ConnectRequest, {
                childProps: _this2.props,
                dispatch: store.dispatch,
                pure: pure,
                ref: function ref(_ref2) {
                  _this2._wrappedInstance = _ref2;
                },
                withRef: _this2.props.withRef
              }, _this2.props.children);
            });
          } else {
            var store = this.context.store;
            return _react.default.createElement(ConnectRequest, {
              dispatch: store.dispatch,
              childProps: this.props,
              pure: pure,
              ref: function ref(_ref3) {
                _this2._wrappedInstance = _ref3;
              },
              withRef: this.props.withRef
            }, this.props.children);
          }
        }
      }]);

      return ConnectRequestHOC;
    }(_react.default.Component);

    var ConnectRequest =
    /*#__PURE__*/
    function (_React$Component2) {
      _inherits(ConnectRequest, _React$Component2);

      function ConnectRequest() {
        var _this3;

        _classCallCheck(this, ConnectRequest);

        _this3 = _possibleConstructorReturn(this, _getPrototypeOf(ConnectRequest).call(this));
        _this3.forceRequest = _this3.forceRequest.bind(_assertThisInitialized(_assertThisInitialized(_this3))); // A set of URLs that identify all pending requests

        _this3._pendingRequests = {};
        _this3._wrappedInstance = null;
        return _this3;
      }

      _createClass(ConnectRequest, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
          if (pure) {
            return !(0, _shallowEqual.default)(this.props.childProps, nextProps) || !(0, _shallowEqual.default)(this.state, nextState);
          } else {
            return true;
          }
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {
          var configs = mapPropsToConfigs(this.props.childProps);
          this.requestAsync(configs, false, true);
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          var prevConfigs = ensureArray(mapPropsToConfigs(prevProps.childProps)).filter(Boolean);
          var configs = ensureArray(mapPropsToConfigs(this.props.childProps)).filter(Boolean);

          var _diffConfigs = diffConfigs(prevConfigs, configs),
              cancelKeys = _diffConfigs.cancelKeys,
              requestKeys = _diffConfigs.requestKeys;

          var requestConfigs = configs.filter(function (config) {
            return (0, _lodash2.default)(requestKeys, (0, _queryKey.getQueryKey)(config));
          });

          if (cancelKeys.length) {
            this.cancelPendingRequests(cancelKeys);
          }

          if (requestConfigs.length) {
            this.requestAsync(requestConfigs, false, true);
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          var cancelKeys = Object.keys(this._pendingRequests);
          this.cancelPendingRequests(cancelKeys);
        }
      }, {
        key: "getWrappedInstance",
        value: function getWrappedInstance() {
          return this._wrappedInstance;
        }
      }, {
        key: "cancelPendingRequests",
        value: function cancelPendingRequests(cancelKeys) {
          var cancelKeysArray = ensureArray(cancelKeys);

          if (cancelKeysArray.length > 0) {
            var dispatch = this.props.dispatch;
            var pendingKeys = Object.keys(this._pendingRequests);
            cancelKeysArray.filter(function (key) {
              return (0, _lodash2.default)(pendingKeys, key);
            }).forEach(function (queryKey) {
              return dispatch((0, _actions.cancelQuery)(queryKey));
            });
          }
        }
      }, {
        key: "requestAsync",
        value: function requestAsync(configs) {
          var _this4 = this;

          var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var retry = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          // propsToConfig mapping has happened already
          ensureArray(configs).filter(Boolean).forEach(function (c) {
            _this4.makeRequest(c, force, retry);
          });
        }
      }, {
        key: "makeRequest",
        value: function makeRequest(config, force, retry) {
          var _this5 = this;

          var dispatch = this.props.dispatch;

          if (config.url) {
            var queryKey = (0, _queryKey.getQueryKey)(config);
            var requestPromise = dispatch((0, _actions.requestAsync)(_objectSpread({
              force: force,
              retry: retry
            }, config, {
              unstable_preDispatchCallback: function unstable_preDispatchCallback() {
                delete _this5._pendingRequests[queryKey];
              }
            })));

            if (requestPromise) {
              // Record pending request since a promise was returned
              this._pendingRequests[queryKey] = requestPromise;
            }
          }
        }
      }, {
        key: "forceRequest",
        value: function forceRequest() {
          this.requestAsync(mapPropsToConfigs(this.props.childProps), true, false);
        }
      }, {
        key: "render",
        value: function render() {
          var _this6 = this;

          if (withRef) {
            return _react.default.createElement(WrappedComponent, _extends({}, this.props.childProps, {
              forceRequest: this.forceRequest,
              ref: function ref(_ref4) {
                _this6._wrappedInstance = _ref4;
              }
            }));
          } else {
            return _react.default.createElement(WrappedComponent, _extends({}, this.props.childProps, {
              forceRequest: this.forceRequest
            }));
          }
        }
      }]);

      return ConnectRequest;
    }(_react.default.Component);

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    ConnectRequestHOC.displayName = "ConnectRequest(".concat(wrappedComponentName, ")");
    ConnectRequestHOC.contextTypes = {
      store: _storeShape.default
    };
    return ConnectRequestHOC;
  };
};

var _default = connectRequest;
exports.default = _default;