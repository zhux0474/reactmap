"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _DrawButton = _interopRequireDefault(require("./DrawButton"));

var _react = require("@testing-library/react");

var React = _interopRequireWildcard(require("react"));

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

var _View = _interopRequireDefault(require("ol/View"));

var _Map = _interopRequireDefault(require("ol/Map"));

var _rtlTestUtils = require("../../Util/rtlTestUtils");

var _Vector = _interopRequireDefault(require("ol/layer/Vector"));

var _Vector2 = _interopRequireDefault(require("ol/source/Vector"));

var _DigitizeUtil = require("../../Util/DigitizeUtil");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('<DrawButton />', function () {
  var map;
  beforeEach(function () {
    map = new _Map["default"]({
      view: new _View["default"]({
        center: [829729, 6708850],
        zoom: 10
      }),
      controls: []
    });
  });
  describe('#Basics', function () {
    it('is defined', function () {
      expect(_DrawButton["default"]).not.toBeUndefined();
    });
    it('can be rendered', function () {
      var _renderInMapContext = (0, _rtlTestUtils.renderInMapContext)(map, /*#__PURE__*/React.createElement(_DrawButton["default"], {
        drawType: 'Point'
      })),
          container = _renderInMapContext.container;

      var button = (0, _react.within)(container).getByRole('button');
      expect(button).toBeVisible();
    });
  });
  describe('#Drawing', function () {
    it('draws points', function () {
      (0, _rtlTestUtils.renderInMapContext)(map, /*#__PURE__*/React.createElement(_DrawButton["default"], {
        drawType: 'Point'
      }));

      var button = _react.screen.getByRole('button');

      var digitizeLayer = _DigitizeUtil.DigitizeUtil.getDigitizeLayer(map);

      _userEvent["default"].click(button);

      (0, _rtlTestUtils.clickMap)(map, 100, 100);
      expect(digitizeLayer.getSource().getFeatures()).toHaveLength(1);
      var feature = digitizeLayer.getSource().getFeatures()[0];
      expect(feature.getGeometry().getType()).toBe('Point');
    });
    it('draws lines', function () {
      (0, _rtlTestUtils.renderInMapContext)(map, /*#__PURE__*/React.createElement(_DrawButton["default"], {
        drawType: 'LineString'
      }));

      var button = _react.screen.getByRole('button');

      var digitizeLayer = _DigitizeUtil.DigitizeUtil.getDigitizeLayer(map);

      _userEvent["default"].click(button);

      (0, _rtlTestUtils.clickMap)(map, 100, 100);
      (0, _rtlTestUtils.doubleClickMap)(map, 120, 100);
      expect(digitizeLayer.getSource().getFeatures()).toHaveLength(1);
      var feature = digitizeLayer.getSource().getFeatures()[0];
      expect(feature.getGeometry().getType()).toBe('LineString');
      expect(feature.getGeometry().getCoordinates()).toHaveLength(2);
    });
    it('draws polygons', function () {
      (0, _rtlTestUtils.renderInMapContext)(map, /*#__PURE__*/React.createElement(_DrawButton["default"], {
        drawType: 'Polygon'
      }));

      var button = _react.screen.getByRole('button');

      var digitizeLayer = _DigitizeUtil.DigitizeUtil.getDigitizeLayer(map);

      _userEvent["default"].click(button);

      (0, _rtlTestUtils.clickMap)(map, 100, 100);
      (0, _rtlTestUtils.clickMap)(map, 120, 100);
      (0, _rtlTestUtils.clickMap)(map, 120, 120);
      (0, _rtlTestUtils.doubleClickMap)(map, 100, 120);
      expect(digitizeLayer.getSource().getFeatures()).toHaveLength(1);
      var feature = digitizeLayer.getSource().getFeatures()[0];
      expect(feature.getGeometry().getType()).toBe('Polygon');
      var coordinates = feature.getGeometry().getCoordinates();
      expect(coordinates).toHaveLength(1);
      expect(coordinates[0]).toHaveLength(5);
    });
    it('draws labels', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var button, digitizeLayer, dialog, input, okButton, feature;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _rtlTestUtils.renderInMapContext)(map, /*#__PURE__*/React.createElement(_DrawButton["default"], {
                drawType: 'Text'
              }));
              button = _react.screen.getByRole('button');
              digitizeLayer = _DigitizeUtil.DigitizeUtil.getDigitizeLayer(map);

              _userEvent["default"].click(button);

              (0, _rtlTestUtils.clickMap)(map, 100, 100);
              dialog = _react.screen.getByRole('dialog');
              expect(dialog).toBeVisible();
              input = _react.screen.getByRole('textbox');

              _userEvent["default"].type(input, 'Label text.');

              okButton = (0, _react.within)(dialog).getByText('Ok');

              _userEvent["default"].click(okButton);

              expect(dialog).not.toBeVisible();
              expect(digitizeLayer.getSource().getFeatures()).toHaveLength(1);
              feature = digitizeLayer.getSource().getFeatures()[0];
              expect(feature.getGeometry().getType()).toBe('Point');
              expect(feature.get('label')).toBe('Label text.');

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('aborts drawing labels', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var button, digitizeLayer, dialog, input, cancelButton;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              (0, _rtlTestUtils.renderInMapContext)(map, /*#__PURE__*/React.createElement(_DrawButton["default"], {
                drawType: 'Text'
              }));
              button = _react.screen.getByRole('button');
              digitizeLayer = _DigitizeUtil.DigitizeUtil.getDigitizeLayer(map);

              _userEvent["default"].click(button);

              (0, _rtlTestUtils.clickMap)(map, 100, 100);
              dialog = _react.screen.getByRole('dialog');
              expect(dialog).toBeVisible();
              input = _react.screen.getByRole('textbox');

              _userEvent["default"].type(input, 'Label text.');

              cancelButton = (0, _react.within)(dialog).getByText('Cancel');

              _userEvent["default"].click(cancelButton);

              expect(dialog).not.toBeVisible();
              expect(digitizeLayer.getSource().getFeatures()).toHaveLength(0);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('draws circles', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var button, digitizeLayer, feature;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              (0, _rtlTestUtils.renderInMapContext)(map, /*#__PURE__*/React.createElement(_DrawButton["default"], {
                drawType: 'Circle'
              }));
              button = _react.screen.getByRole('button');
              digitizeLayer = _DigitizeUtil.DigitizeUtil.getDigitizeLayer(map);

              _userEvent["default"].click(button);

              (0, _rtlTestUtils.clickMap)(map, 100, 100);
              (0, _rtlTestUtils.clickMap)(map, 120, 120);
              expect(digitizeLayer.getSource().getFeatures()).toHaveLength(1);
              feature = digitizeLayer.getSource().getFeatures()[0];
              expect(feature.getGeometry().getType()).toBe('Circle');

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('draws rectangles', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var button, digitizeLayer, feature, coordinates;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              (0, _rtlTestUtils.renderInMapContext)(map, /*#__PURE__*/React.createElement(_DrawButton["default"], {
                drawType: 'Rectangle'
              }));
              button = _react.screen.getByRole('button');
              digitizeLayer = _DigitizeUtil.DigitizeUtil.getDigitizeLayer(map);

              _userEvent["default"].click(button);

              (0, _rtlTestUtils.clickMap)(map, 100, 100);
              (0, _rtlTestUtils.clickMap)(map, 120, 120);
              expect(digitizeLayer.getSource().getFeatures()).toHaveLength(1);
              feature = digitizeLayer.getSource().getFeatures()[0];
              expect(feature.getGeometry().getType()).toBe('Polygon');
              coordinates = feature.getGeometry().getCoordinates();
              expect(coordinates).toHaveLength(1);
              expect(coordinates[0]).toHaveLength(5);

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('toggles off', function () {
      (0, _rtlTestUtils.renderInMapContext)(map, /*#__PURE__*/React.createElement(_DrawButton["default"], {
        drawType: 'Point'
      }));

      var button = _react.screen.getByRole('button');

      var digitizeLayer = _DigitizeUtil.DigitizeUtil.getDigitizeLayer(map);

      expect(digitizeLayer.getSource().getFeatures()).toHaveLength(0);

      _userEvent["default"].click(button);

      (0, _rtlTestUtils.clickMap)(map, 100, 100);
      expect(digitizeLayer.getSource().getFeatures()).toHaveLength(1);

      _userEvent["default"].click(button);

      (0, _rtlTestUtils.clickMap)(map, 120, 100);
      expect(digitizeLayer.getSource().getFeatures()).toHaveLength(1);

      _userEvent["default"].click(button);

      (0, _rtlTestUtils.clickMap)(map, 120, 100);
      expect(digitizeLayer.getSource().getFeatures()).toHaveLength(2);
    });
    it('calls draw start and draw end listeners', function () {
      var startSpy = jest.fn();
      var endSpy = jest.fn();
      (0, _rtlTestUtils.renderInMapContext)(map, /*#__PURE__*/React.createElement(_DrawButton["default"], {
        drawType: 'Polygon',
        onDrawStart: startSpy,
        onDrawEnd: endSpy
      }));

      var button = _react.screen.getByRole('button');

      _userEvent["default"].click(button);

      expect(startSpy).not.toBeCalled();
      expect(endSpy).not.toBeCalled();
      (0, _rtlTestUtils.clickMap)(map, 100, 100);
      expect(startSpy).toBeCalledTimes(1);
      expect(endSpy).not.toBeCalled();
      (0, _rtlTestUtils.clickMap)(map, 120, 100);
      (0, _rtlTestUtils.clickMap)(map, 120, 120);
      (0, _rtlTestUtils.doubleClickMap)(map, 100, 120);
      expect(startSpy).toBeCalledTimes(1);
      expect(endSpy).toBeCalledTimes(1);
      var drawEndEvent = endSpy.mock.calls[0][0];
      var geometry = drawEndEvent.feature.getGeometry();
      expect(geometry.getType()).toBe('Polygon');
      expect(geometry.getCoordinates()[0]).toHaveLength(5);
    });
    it('multiple draw buttons use the same digitize layer', function () {
      (0, _rtlTestUtils.renderInMapContext)(map, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_DrawButton["default"], {
        drawType: 'Point'
      }, "Point 1"), /*#__PURE__*/React.createElement(_DrawButton["default"], {
        drawType: 'Point'
      }, "Point 2")));

      var button1 = _react.screen.getByText('Point 1');

      var button2 = _react.screen.getByText('Point 2');

      var digitizeLayer = _DigitizeUtil.DigitizeUtil.getDigitizeLayer(map);

      _userEvent["default"].click(button1);

      (0, _rtlTestUtils.clickMap)(map, 100, 100);

      _userEvent["default"].click(button1);

      _userEvent["default"].click(button2);

      (0, _rtlTestUtils.clickMap)(map, 120, 120);
      expect(digitizeLayer.getSource().getFeatures()).toHaveLength(2);
    });
    it('can use a custom layer', function () {
      var layer = new _Vector["default"]({
        source: new _Vector2["default"]()
      });
      map.addLayer(layer);
      (0, _rtlTestUtils.renderInMapContext)(map, /*#__PURE__*/React.createElement(_DrawButton["default"], {
        drawType: 'Point',
        digitizeLayer: layer
      }));

      var button = _react.screen.getByRole('button');

      _userEvent["default"].click(button);

      (0, _rtlTestUtils.clickMap)(map, 100, 100);
      expect(layer.getSource().getFeatures()).toHaveLength(1);

      var defaultDigitizeLayer = _DigitizeUtil.DigitizeUtil.getDigitizeLayer(map);

      expect(defaultDigitizeLayer.getSource().getFeatures()).toHaveLength(0);
    });
    it('can change the type', function () {
      var _renderInMapContext2 = (0, _rtlTestUtils.renderInMapContext)(map, /*#__PURE__*/React.createElement(_DrawButton["default"], {
        drawType: 'Point'
      })),
          rerenderInMapContext = _renderInMapContext2.rerenderInMapContext;

      var button = _react.screen.getByRole('button');

      _userEvent["default"].click(button);

      (0, _rtlTestUtils.clickMap)(map, 100, 100);

      var digitizeLayer = _DigitizeUtil.DigitizeUtil.getDigitizeLayer(map);

      expect(digitizeLayer.getSource().getFeatures()).toHaveLength(1);
      expect(digitizeLayer.getSource().getFeatures()[0].getGeometry().getType()).toBe('Point');
      rerenderInMapContext( /*#__PURE__*/React.createElement(_DrawButton["default"], {
        drawType: 'LineString'
      }));
      (0, _rtlTestUtils.clickMap)(map, 120, 120);
      (0, _rtlTestUtils.doubleClickMap)(map, 140, 140);
      expect(digitizeLayer.getSource().getFeatures()).toHaveLength(2);
      expect(digitizeLayer.getSource().getFeatures()[1].getGeometry().getType()).toBe('LineString');
    });
  });
});