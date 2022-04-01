"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actSetTimeout = actSetTimeout;
exports.clickMap = clickMap;
exports.doubleClickMap = doubleClickMap;
exports.mockForEachFeatureAtPixel = mockForEachFeatureAtPixel;
exports.renderInMapContext = renderInMapContext;

var _react = require("@testing-library/react");

var _MapContext = _interopRequireDefault(require("../Context/MapContext/MapContext"));

var _MapComponent = _interopRequireDefault(require("../Map/MapComponent/MapComponent"));

var React = _interopRequireWildcard(require("react"));

var _excluded = ["rerender"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function actSetTimeout(_x) {
  return _actSetTimeout.apply(this, arguments);
}

function _actSetTimeout() {
  _actSetTimeout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(time) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", (0, _react.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      return _context.abrupt("return", new Promise(function (resolve) {
                        return setTimeout(resolve, time);
                      }));

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }))));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _actSetTimeout.apply(this, arguments);
}

function fireClickEvents(map, x, y) {
  var pointerId = Math.random().toFixed(10).slice(2);
  var evt1 = new MouseEvent('pointerdown', {
    clientX: x,
    clientY: y,
    button: 0
  }); // @ts-ignore

  evt1.pointerId = pointerId;
  (0, _react.fireEvent)(map.getViewport(), evt1);
  var evt2 = new MouseEvent('pointerup', {
    clientX: x,
    clientY: y,
    button: 0
  }); // @ts-ignore

  evt2.pointerId = pointerId;
  (0, _react.fireEvent)(document, evt2);
}
/**
 * Be aware that this will only work if the map was initialized with `setSize` and `renderSync` after adding it to
 * the dom.
 * @param map
 * @param x
 * @param y
 */


function clickMap(map, x, y) {
  jest.useFakeTimers();
  fireClickEvents(map, x, y);
  jest.runAllTimers();
  jest.useRealTimers();
}
/**
 * Be aware that this will only work if the map was initialized with `setSize` and `renderSync` after adding it to
 * the dom.
 * @param map
 * @param x
 * @param y
 */


function doubleClickMap(map, x, y) {
  fireClickEvents(map, x, y);
  fireClickEvents(map, x, y);
}
/**
 * This function renders the given element inside a map context and initializes the map with size `[400, 400]`, ready
 * to be used by the event functions in this file.
 */


function renderInMapContext(map, element) {
  var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [400, 400];

  var assemble = function assemble(newElement) {
    return /*#__PURE__*/React.createElement(_MapContext["default"].Provider, {
      value: map
    }, /*#__PURE__*/React.createElement(_MapComponent["default"], {
      map: map
    }), newElement);
  };

  var _render = (0, _react.render)(assemble(element)),
      rerender = _render.rerender,
      results = _objectWithoutProperties(_render, _excluded);

  map.setSize([400, 400]);
  map.renderSync();

  var rerenderInMapContext = function rerenderInMapContext(newElement) {
    rerender(assemble(newElement));
  };

  return _objectSpread({
    rerenderInMapContext: rerenderInMapContext
  }, results);
}

function mockForEachFeatureAtPixel(map, pixel, feature, layer) {
  return jest.spyOn(map, 'forEachFeatureAtPixel').mockImplementation(function (atPixel, callback) {
    if (pixel[0] === atPixel[0] && pixel[1] === atPixel[1]) {
      callback(feature, layer, null);
    }
  });
}