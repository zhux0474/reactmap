"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _react = require("@testing-library/react");

var React = _interopRequireWildcard(require("react"));

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

var _Tile = _interopRequireDefault(require("ol/layer/Tile"));

var _TileWMS = _interopRequireDefault(require("ol/source/TileWMS"));

var _TestUtil = _interopRequireDefault(require("../../Util/TestUtil"));

var _MapUtil = _interopRequireDefault(require("@terrestris/ol-util/dist/MapUtil/MapUtil"));

var _AddWmsPanel = _interopRequireDefault(require("./AddWmsPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('<AddWmsPanel />', function () {
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
  var testLayerName2 = 'OSM-WMS 2';
  var testLayerTitle2 = 'OSM-WMS - by terrestris 2';
  var testLayer2 = new _Tile["default"]({
    visible: false,
    title: testLayerTitle2,
    source: new _TileWMS["default"]({
      url: 'https://ows.terrestris.de/osm/service?',
      params: {
        'LAYERS': testLayerName2,
        'TILED': true
      }
    })
  });
  var testWmsLayers = [testLayer, testLayer2];
  beforeEach(function () {
    map = _TestUtil["default"].createMap();
  });
  it('is defined', function () {
    expect(_AddWmsPanel["default"]).not.toBeUndefined();
  });
  it('can be rendered', function () {
    var _render = (0, _react.render)( /*#__PURE__*/React.createElement(_AddWmsPanel["default"], {
      wmsLayers: testWmsLayers
    })),
        container = _render.container;

    expect(container).toBeVisible();
  });
  it('shows a list of all available layers', function () {
    (0, _react.render)( /*#__PURE__*/React.createElement(_AddWmsPanel["default"], {
      wmsLayers: testWmsLayers
    }));

    var dialog = _react.screen.getByRole('dialog');

    expect(dialog).toBeVisible();
    var title = (0, _react.within)(dialog).getByText(/add wms layer/i);
    expect(title).toBeVisible();
    var list = (0, _react.within)(dialog).getByRole('list');
    expect(list).toBeVisible();
    var items = (0, _react.within)(list).getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent(testLayerTitle);
    expect(items[1]).toHaveTextContent(testLayerTitle2);
  });
  describe('`add all layers` button', function () {
    it('adds all layers to the map', function () {
      (0, _react.render)( /*#__PURE__*/React.createElement(_AddWmsPanel["default"], {
        map: map,
        wmsLayers: testWmsLayers
      }));

      var addAllLayersButton = _react.screen.getByRole('button', {
        name: /add all layers/i
      });

      _userEvent["default"].click(addAllLayersButton);

      var layers = _MapUtil["default"].getLayersByProperty(map, 'title', testLayerTitle);

      expect(layers).toHaveLength(1);
      expect(layers).toContain(testLayer);

      var layers2 = _MapUtil["default"].getLayersByProperty(map, 'title', testLayerTitle2);

      expect(layers2).toHaveLength(1);
      expect(layers2).toContain(testLayer2);
    });
    it('passes all layers to `onLayerAddToMap` if provided', function () {
      var callback = jest.fn();
      (0, _react.render)( /*#__PURE__*/React.createElement(_AddWmsPanel["default"], {
        wmsLayers: testWmsLayers,
        onLayerAddToMap: callback
      }));

      var addAllLayersButton = _react.screen.getByRole('button', {
        name: /add all layers/i
      });

      _userEvent["default"].click(addAllLayersButton);

      expect(callback).toBeCalledWith(testWmsLayers);
    });
  });
  describe('`add selected layers` button', function () {
    it('fires `onSelectedChange`', function () {
      var callback = jest.fn();
      (0, _react.render)( /*#__PURE__*/React.createElement(_AddWmsPanel["default"], {
        wmsLayers: testWmsLayers,
        onSelectionChange: callback
      }));

      var checkbox = _react.screen.getByRole('checkbox', {
        name: testLayerTitle
      });

      _userEvent["default"].click(checkbox);

      expect(callback).toBeCalledWith([testLayerTitle]);

      _userEvent["default"].click(checkbox);

      expect(callback).toBeCalledWith([]);
    });
    it('adds selected layers to the map', function () {
      (0, _react.render)( /*#__PURE__*/React.createElement(_AddWmsPanel["default"], {
        map: map,
        wmsLayers: testWmsLayers
      }));

      var checkbox = _react.screen.getByRole('checkbox', {
        name: testLayerTitle
      });

      _userEvent["default"].click(checkbox);

      var addSelectedLayersButton = _react.screen.getByRole('button', {
        name: /add selected layers/i
      });

      _userEvent["default"].click(addSelectedLayersButton);

      var layers = _MapUtil["default"].getLayersByProperty(map, 'title', testLayerTitle);

      expect(layers).toHaveLength(1);
      expect(layers).toContain(testLayer);

      var layers2 = _MapUtil["default"].getLayersByProperty(map, 'title', testLayerTitle2);

      expect(layers2).toHaveLength(0);
    });
    it('passes selected layers to `onLayerAddToMap` if provided', function () {
      var callback = jest.fn();
      (0, _react.render)( /*#__PURE__*/React.createElement(_AddWmsPanel["default"], {
        wmsLayers: testWmsLayers,
        onLayerAddToMap: callback
      }));

      var checkbox = _react.screen.getByRole('checkbox', {
        name: testLayerTitle
      });

      _userEvent["default"].click(checkbox);

      var addSelectedLayersButton = _react.screen.getByRole('button', {
        name: /add selected layers/i
      });

      _userEvent["default"].click(addSelectedLayersButton);

      expect(callback).toBeCalledWith([testLayer]);
    });
  });
  describe('cancel button', function () {
    it('shows no cancel button if no `onCancel` method is provided', function () {
      (0, _react.render)( /*#__PURE__*/React.createElement(_AddWmsPanel["default"], {
        wmsLayers: testWmsLayers
      }));

      var onCancelButton = _react.screen.queryByRole('button', {
        name: /cancel/i
      });

      expect(onCancelButton).not.toBeInTheDocument();
    });
    it('shows a cancel button if an `onCancel` method is provided and calls it if the button was clicked', function () {
      var callback = jest.fn();
      (0, _react.render)( /*#__PURE__*/React.createElement(_AddWmsPanel["default"], {
        wmsLayers: testWmsLayers,
        onCancel: callback
      }));

      var onCancelButton = _react.screen.getByRole('button', {
        name: /cancel/i
      });

      expect(onCancelButton).toBeInTheDocument();

      _userEvent["default"].click(onCancelButton);

      expect(callback).toBeCalled();
    });
  });
});