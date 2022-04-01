"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var React = _interopRequireWildcard(require("react"));

var _react2 = require("@testing-library/react");

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

var _Map = _interopRequireDefault(require("ol/Map"));

var _View = _interopRequireDefault(require("ol/View"));

var _Feature = _interopRequireDefault(require("ol/Feature"));

var _Point = _interopRequireDefault(require("ol/geom/Point"));

var _Vector = _interopRequireDefault(require("ol/layer/Vector"));

var _Vector2 = _interopRequireDefault(require("ol/source/Vector"));

var _DrawButton = _interopRequireDefault(require("../DrawButton/DrawButton"));

var _rtlTestUtils = require("../../Util/rtlTestUtils");

var _SelectFeaturesButton = _interopRequireDefault(require("./SelectFeaturesButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('<SelectFeaturesButton />', function () {
  var coord = [829729, 6708850];
  var map;
  var layer;
  var feature;
  beforeEach(function () {
    feature = new _Feature["default"](new _Point["default"](coord));
    layer = new _Vector["default"]({
      source: new _Vector2["default"]({
        features: [feature]
      })
    });
    map = new _Map["default"]({
      view: new _View["default"]({
        center: coord,
        zoom: 10
      }),
      controls: [],
      layers: [layer]
    });
  });
  describe('#Basics', function () {
    it('is defined', function () {
      expect(_DrawButton["default"]).not.toBeUndefined();
    });
    it('can be rendered', function () {
      var _renderInMapContext = (0, _rtlTestUtils.renderInMapContext)(map, /*#__PURE__*/React.createElement(_SelectFeaturesButton["default"], {
        layers: [layer]
      })),
          container = _renderInMapContext.container;

      var button = (0, _react2.within)(container).getByRole('button');
      expect(button).toBeVisible();
    });
  });
  describe('#Selection', function () {
    it('calls the listener', function () {
      var mock = (0, _rtlTestUtils.mockForEachFeatureAtPixel)(map, [200, 200], feature);
      var selectSpy = jest.fn();
      (0, _rtlTestUtils.renderInMapContext)(map, /*#__PURE__*/React.createElement(_SelectFeaturesButton["default"], {
        layers: [layer],
        onFeatureSelect: selectSpy
      }));

      var button = _react2.screen.getByRole('button');

      _userEvent["default"].click(button);

      (0, _rtlTestUtils.clickMap)(map, 200, 200);
      expect(selectSpy).toBeCalled();
      var event = selectSpy.mock.calls[0][0];
      expect(event.selected).toEqual([feature]);
      mock.mockRestore();
    });
  });
});