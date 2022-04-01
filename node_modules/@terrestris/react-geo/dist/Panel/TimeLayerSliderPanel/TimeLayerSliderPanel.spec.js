"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var React = _interopRequireWildcard(require("react"));

var _TestUtil = _interopRequireDefault(require("../../Util/TestUtil"));

var _moment = _interopRequireDefault(require("moment"));

var _TimeLayerSliderPanel = _interopRequireDefault(require("../TimeLayerSliderPanel/TimeLayerSliderPanel"));

var _react2 = require("@testing-library/react");

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

var _Tile = _interopRequireDefault(require("ol/layer/Tile"));

var _TileWMS = _interopRequireDefault(require("ol/source/TileWMS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('<TimeLayerSliderPanel />', function () {
  var map;
  var testLayerName = 'OSM-WMS';
  var testLayerTitle = 'OSM-WMS - by terrestris';
  var testLayer = new _Tile["default"]({
    visible: false,
    title: testLayerTitle,
    source: new _TileWMS["default"]({
      url: 'https://ows.terrestris.de/osm/service?',
      params: {
        'LAYERS': testLayerName,
        'TILED': true
      }
    })
  });
  beforeEach(function () {
    map = _TestUtil["default"].createMap();
    map.addLayer(testLayer);
  });
  it('is defined', function () {
    expect(_TimeLayerSliderPanel["default"]).not.toBeUndefined();
  });
  it('can be rendered', function () {
    var _render = (0, _react2.render)( /*#__PURE__*/React.createElement(_TimeLayerSliderPanel["default"], {
      map: map,
      initStartDate: (0, _moment["default"])().subtract(3, 'hours'),
      initEndDate: (0, _moment["default"])()
    })),
        container = _render.container;

    expect(container).toBeVisible();
  });
  it('autoplay button is visible', function () {
    (0, _react2.render)( /*#__PURE__*/React.createElement(_TimeLayerSliderPanel["default"], {
      map: map,
      initStartDate: (0, _moment["default"])().subtract(3, 'hours'),
      initEndDate: (0, _moment["default"])()
    }));

    var playButton = _react2.screen.getByLabelText('Autoplay');

    expect(playButton).toBeVisible();
  });
  it('autoplay can be toggled', function () {
    (0, _react2.render)( /*#__PURE__*/React.createElement(_TimeLayerSliderPanel["default"], {
      map: map,
      initStartDate: (0, _moment["default"])().subtract(3, 'hours'),
      initEndDate: (0, _moment["default"])(),
      timeAwareLayers: [testLayer]
    }));

    var playButton = _react2.screen.getByLabelText('Autoplay');

    expect(playButton).toHaveAttribute('aria-pressed', 'false');

    _userEvent["default"].click(playButton);

    expect(playButton).toHaveAttribute('aria-pressed', 'true');
    expect(playButton).toBeVisible();
  });
});