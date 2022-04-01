"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _react = require("@testing-library/react");

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

var React = _interopRequireWildcard(require("react"));

var _proj = require("ol/proj");

var _TestUtil = _interopRequireDefault(require("../../Util/TestUtil"));

var _geolocationMock = require("../../Util/geolocationMock");

var _GeoLocationButton = _interopRequireDefault(require("./GeoLocationButton"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('<GeoLocationButton />', function () {
  var map;
  beforeAll(function () {
    (0, _geolocationMock.enableGeolocationMock)();
  });
  afterAll(function () {
    (0, _geolocationMock.disableGeolocationMock)();
  });
  beforeEach(function () {
    map = _TestUtil["default"].createMap();
  });
  describe('#Basics', function () {
    it('is defined', function () {
      expect(_GeoLocationButton["default"]).not.toBeUndefined();
    });
    it('can be rendered', function () {
      var _render = (0, _react.render)( /*#__PURE__*/React.createElement(_GeoLocationButton["default"], {
        map: map
      })),
          container = _render.container;

      expect(container).toBeVisible();
    });
    it('can be pressed', function () {
      var callback = jest.fn();

      var _render2 = (0, _react.render)( /*#__PURE__*/React.createElement(_GeoLocationButton["default"], {
        map: map,
        showMarker: false,
        onGeolocationChange: callback
      })),
          container = _render2.container;

      var button = (0, _react.within)(container).getByRole('button');

      _userEvent["default"].click(button);

      (0, _geolocationMock.fireGeolocationListeners)();
      expect(callback).toBeCalled();
    });
    it('can be pressed twice', function () {
      var callback = jest.fn();

      var _render3 = (0, _react.render)( /*#__PURE__*/React.createElement(_GeoLocationButton["default"], {
        map: map,
        showMarker: false,
        onGeolocationChange: callback
      })),
          container = _render3.container;

      (0, _geolocationMock.fireGeolocationListeners)();
      expect(callback).toBeCalledTimes(0);
      var button = (0, _react.within)(container).getByRole('button');

      _userEvent["default"].click(button);

      (0, _geolocationMock.fireGeolocationListeners)();
      expect(callback).toBeCalledTimes(1);

      _userEvent["default"].click(button);

      (0, _geolocationMock.fireGeolocationListeners)();
      expect(callback).toBeCalledTimes(1);
    });
    it('is called with the correct position', function () {
      var callback = jest.fn();

      var _render4 = (0, _react.render)( /*#__PURE__*/React.createElement(_GeoLocationButton["default"], {
        map: map,
        showMarker: false,
        onGeolocationChange: callback
      })),
          container = _render4.container;

      var button = (0, _react.within)(container).getByRole('button');

      _userEvent["default"].click(button);

      var coordinates = [47.12, -64.99];
      (0, _geolocationMock.fireGeolocationListeners)({
        coords: {
          longitude: coordinates[0],
          latitude: coordinates[1],
          accuracy: 7,
          speed: 9,
          heading: 0
        }
      });
      var converted = (0, _proj.transform)(coordinates, 'EPSG:4326', map.getView().getProjection());
      expect(callback).toBeCalledWith({
        accuracy: 7,
        heading: 0,
        position: converted,
        speed: 9
      });
    });
  });
});