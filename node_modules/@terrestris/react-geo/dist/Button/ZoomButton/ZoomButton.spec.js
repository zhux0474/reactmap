"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _TestUtil = _interopRequireDefault(require("../../Util/TestUtil"));

var _rtlTestUtils = require("../../Util/rtlTestUtils");

var _Map = _interopRequireDefault(require("ol/Map"));

var _react = require("@testing-library/react");

var React = _interopRequireWildcard(require("react"));

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

var _ZoomButton = _interopRequireDefault(require("./ZoomButton"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('<ZoomButton />', function () {
  var map;
  beforeEach(function () {
    map = _TestUtil["default"].createMap();
  });
  it('is defined', function () {
    expect(_ZoomButton["default"]).not.toBeUndefined();
  });
  it('can be rendered', function () {
    var _render = (0, _react.render)( /*#__PURE__*/React.createElement(_ZoomButton["default"], {
      map: map
    })),
        container = _render.container;

    expect(container).toBeVisible();
  });
  it('zooms in when clicked', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var initialZoom, button, newZoom;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _react.render)( /*#__PURE__*/React.createElement(_ZoomButton["default"], {
              map: map
            }, "Zoom test"));
            initialZoom = map.getView().getZoom();
            button = _react.screen.getByText('Zoom test');

            _userEvent["default"].click(button);

            _context.next = 6;
            return (0, _rtlTestUtils.actSetTimeout)(300);

          case 6:
            newZoom = map.getView().getZoom();
            expect(newZoom).toBe(initialZoom + 1);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('can be configured to zoom out', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var initialZoom, button, newZoom;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (0, _react.render)( /*#__PURE__*/React.createElement(_ZoomButton["default"], {
              map: map,
              delta: -1
            }, "Zoom test"));
            initialZoom = map.getView().getZoom();
            button = _react.screen.getByText('Zoom test');

            _userEvent["default"].click(button);

            _context2.next = 6;
            return (0, _rtlTestUtils.actSetTimeout)(300);

          case 6:
            newZoom = map.getView().getZoom();
            expect(newZoom).toBe(initialZoom - 1);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('does not belch when map has no view', function () {
    (0, _react.render)( /*#__PURE__*/React.createElement(_ZoomButton["default"], {
      map: new _Map["default"](null)
    }, "Zoom test"));

    var button = _react.screen.getByText('Zoom test');

    expect(function () {
      _userEvent["default"].click(button);
    }).not.toThrow();
  });
  it('cancels already running animations', function () {
    (0, _react.render)( /*#__PURE__*/React.createElement(_ZoomButton["default"], {
      map: map,
      animateOptions: {
        duration: 250
      }
    }, "Zoom test"));

    var button = _react.screen.getByText('Zoom test');

    var view = map.getView();
    view.cancelAnimations = jest.fn();

    _userEvent["default"].click(button);

    _userEvent["default"].click(button);

    _userEvent["default"].click(button);

    expect(view.cancelAnimations.mock.calls.length).toBe(2);
  });
});