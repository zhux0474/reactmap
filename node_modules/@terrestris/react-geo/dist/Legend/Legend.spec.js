"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _react = require("@testing-library/react");

var React = _interopRequireWildcard(require("react"));

var _Tile = _interopRequireDefault(require("ol/layer/Tile"));

var _TileWMS = _interopRequireDefault(require("ol/source/TileWMS"));

var _TileJSON = _interopRequireDefault(require("ol/source/TileJSON"));

var _Legend = _interopRequireDefault(require("./Legend"));

var _MapUtil = _interopRequireDefault(require("@terrestris/ol-util/dist/MapUtil/MapUtil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('<Legend />', function () {
  var layer1;
  var layer2;
  beforeEach(function () {
    layer1 = new _Tile["default"]({
      name: 'OSM-WMS',
      source: new _TileWMS["default"]({
        url: 'https://ows.terrestris.de/osm/service',
        params: {
          'LAYERS': 'OSM-WMS',
          'TILED': true
        },
        serverType: 'geoserver'
      })
    });
    layer2 = new _Tile["default"]({
      legendUrl: 'https://www.koeln.de/files/images/Karnevalstrikot_Spieler_270.jpg',
      name: 'A layer',
      source: new _TileJSON["default"]({
        url: 'https://example.org',
        crossOrigin: 'anonymous'
      })
    });
  });
  it('is defined', function () {
    expect(_Legend["default"]).not.toBeUndefined();
  });
  it('can be rendered', function () {
    var _render = (0, _react.render)( /*#__PURE__*/React.createElement(_Legend["default"], {
      layer: layer2
    })),
        container = _render.container;

    expect(container).toBeVisible();
  });
  describe('Legend created with Layer', function () {
    it('takes the legendGraphic from layer.get("legendUrl") if configured', function () {
      (0, _react.render)( /*#__PURE__*/React.createElement(_Legend["default"], {
        layer: layer2
      }));

      var image = _react.screen.getByRole('img');

      expect(image).toBeVisible();
      expect(image).toHaveAttribute('src', layer2.get('legendUrl'));
    });
    it('generates getLegendGraphicUrl if no "legendUrl" configured', function () {
      (0, _react.render)( /*#__PURE__*/React.createElement(_Legend["default"], {
        layer: layer1
      }));

      var image = _react.screen.getByRole('img');

      var legendUrl = _MapUtil["default"].getLegendGraphicUrl(layer1);

      expect(image).toBeVisible();
      expect(image).toHaveAttribute('src', legendUrl);
    });
    it('generates getLegendGraphicUrl if no "legendUrl" configured (extraParams)', function () {
      var extraParams = {
        HEIGHT: 400,
        WIDTH: 400,
        LANGUAGE: 'de'
      };
      (0, _react.render)( /*#__PURE__*/React.createElement(_Legend["default"], {
        layer: layer1,
        extraParams: extraParams
      }));

      var image = _react.screen.getByRole('img');

      var legendUrl = _MapUtil["default"].getLegendGraphicUrl(layer1, extraParams);

      expect(image).toBeVisible();
      expect(image).toHaveAttribute('src', legendUrl);
    });
    it('creates an alt attribute corresponding to layername', function () {
      (0, _react.render)( /*#__PURE__*/React.createElement(_Legend["default"], {
        layer: layer1
      }));

      var image = _react.screen.getByRole('img');

      expect(image).toBeVisible();
      expect(image).toHaveAttribute('alt', "".concat(layer1.get('name'), " legend"));
    });
  });
});