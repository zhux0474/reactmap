"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _react = require("@testing-library/react");

var React = _interopRequireWildcard(require("react"));

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

var _TestUtil = _interopRequireDefault(require("../Util/TestUtil"));

var _LayerSwitcher = _interopRequireDefault(require("./LayerSwitcher"));

var _Tile = _interopRequireDefault(require("ol/layer/Tile"));

var _Stamen = _interopRequireDefault(require("ol/source/Stamen"));

var _OSM = _interopRequireDefault(require("ol/source/OSM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('<LayerSwitcher />', function () {
  var map;
  var layers;
  beforeEach(function () {
    layers = [new _Tile["default"]({
      name: 'OSM',
      source: new _OSM["default"]()
    }), new _Tile["default"]({
      name: 'Stamen',
      source: new _Stamen["default"]({
        layer: 'watercolor'
      })
    })];
    map = _TestUtil["default"].createMap();
    map.addLayer(layers[0]);
    map.addLayer(layers[1]);
  });
  afterEach(function () {
    map.dispose();
    layers = null;
    map = null;
  });
  it('is defined', function () {
    expect(_LayerSwitcher["default"]).not.toBeUndefined();
  });
  it('can be rendered', function () {
    var _render = (0, _react.render)( /*#__PURE__*/React.createElement(_LayerSwitcher["default"], {
      layers: layers,
      map: map
    })),
        container = _render.container;

    expect(container).toBeVisible();
  });
  it('contains map element', function () {
    var _render2 = (0, _react.render)( /*#__PURE__*/React.createElement(_LayerSwitcher["default"], {
      layers: layers,
      map: map
    })),
        container = _render2.container;

    var mapElement = (0, _react.within)(container).getByRole('img');
    expect(mapElement).toBeVisible();
  });
  it('adds a custom className', function () {
    var _render3 = (0, _react.render)( /*#__PURE__*/React.createElement(_LayerSwitcher["default"], {
      layers: layers,
      map: map,
      className: "peter"
    })),
        container = _render3.container;

    expect(container.children[0]).toHaveClass('peter');
  });
  it('passes style prop', function () {
    var _render4 = (0, _react.render)( /*#__PURE__*/React.createElement(_LayerSwitcher["default"], {
      layers: layers,
      map: map,
      style: {
        backgroundColor: 'yellow',
        position: 'inherit'
      }
    })),
        container = _render4.container;

    var child = container.children[0];
    expect(child).toHaveStyle({
      backgroundColor: 'yellow'
    });
    expect(child).toHaveStyle({
      position: 'inherit'
    });
  });
  it('sets all but one layer to invisible', function () {
    (0, _react.render)( /*#__PURE__*/React.createElement(_LayerSwitcher["default"], {
      layers: layers,
      map: map
    }));
    var layer0visibile = layers[0].getVisible();
    var layer1visibile = layers[1].getVisible();
    expect(layer0visibile && layer1visibile).toBe(false);
    expect(layer0visibile || layer1visibile).toBe(true);
  });
  it('switches the visible layer on click', function () {
    var _render5 = (0, _react.render)( /*#__PURE__*/React.createElement(_LayerSwitcher["default"], {
      layers: layers,
      map: map
    })),
        container = _render5.container;

    var switcher = (0, _react.within)(container).getByRole('button');
    var layer0visibile = layers[0].getVisible();
    var layer1visibile = layers[1].getVisible();

    _userEvent["default"].click(switcher);

    expect(layers[0].getVisible()).toBe(!layer0visibile);
    expect(layers[1].getVisible()).toBe(!layer1visibile);
  });
});