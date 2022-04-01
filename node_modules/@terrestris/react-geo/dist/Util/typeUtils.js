"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isImageOrTileLayer = isImageOrTileLayer;
exports.isWmsLayer = isWmsLayer;

var _Layer = _interopRequireDefault(require("ol/layer/Layer"));

var _ImageWMS = _interopRequireDefault(require("ol/source/ImageWMS"));

var _TileWMS = _interopRequireDefault(require("ol/source/TileWMS"));

var _Image = _interopRequireDefault(require("ol/layer/Image"));

var _Tile = _interopRequireDefault(require("ol/layer/Tile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isWmsLayer(layer) {
  if (layer instanceof _Layer["default"]) {
    var source = layer.getSource();
    return source instanceof _ImageWMS["default"] || source instanceof _TileWMS["default"];
  }

  return false;
}

function isImageOrTileLayer(layer) {
  return layer instanceof _Image["default"] || layer instanceof _Tile["default"];
}