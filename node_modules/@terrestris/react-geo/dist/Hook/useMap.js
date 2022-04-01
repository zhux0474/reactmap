"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMap = void 0;

var _react = require("react");

var _MapContext = _interopRequireDefault(require("../Context/MapContext/MapContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useMap = function useMap() {
  return (0, _react.useContext)(_MapContext["default"]);
};

exports.useMap = useMap;