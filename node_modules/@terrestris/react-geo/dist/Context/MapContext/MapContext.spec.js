"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _useMap = require("../../Hook/useMap");

var _MapContext = _interopRequireDefault(require("./MapContext"));

var _TestUtil = require("../../Util/TestUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('MapContext', function () {
  var olMap = _TestUtil.TestUtil.createMap();

  var MapThing = function MapThing(_ref) {
    var map = _ref.map;

    if (!map) {
      return /*#__PURE__*/_react["default"].createElement("span", null, "No map found");
    }

    return /*#__PURE__*/_react["default"].createElement("span", null, map.getView().getCenter());
  };

  var Thing = function Thing() {
    var map = (0, _useMap.useMap)();
    return /*#__PURE__*/_react["default"].createElement(MapThing, {
      map: map
    });
  };

  it('is defined', function () {
    expect(_useMap.useMap).toBeDefined();
  });
  describe('with useMap', function () {
    it('provides the default value', function () {
      var got = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(Thing, null));
      expect(got.props().map).toEqual(null);
    });
    it('provides a map if given', function () {
      var container = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_MapContext["default"].Provider, {
        value: olMap
      }, /*#__PURE__*/_react["default"].createElement(Thing, null)));
      var got = container.childAt(0);
      expect(got.props().map).toEqual(olMap);
    });
  });
  describe('with Consumer', function () {
    it('provides the default value', function () {
      var got = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_MapContext["default"].Consumer, null, function (map) {
        return /*#__PURE__*/_react["default"].createElement(MapThing, {
          map: map
        });
      }));
      expect(got.props().map).toEqual(null);
    });
    it('provides a map if given', function () {
      var got = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_MapContext["default"].Provider, {
        value: olMap
      }, /*#__PURE__*/_react["default"].createElement(_MapContext["default"].Consumer, null, function (map) {
        return /*#__PURE__*/_react["default"].createElement(MapThing, {
          map: map
        });
      })));
      expect(got.props().map).toEqual(olMap);
    });
  });
});