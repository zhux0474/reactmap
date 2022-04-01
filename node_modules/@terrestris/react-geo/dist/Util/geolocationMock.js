"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disableGeolocationMock = disableGeolocationMock;
exports.enableGeolocationMock = enableGeolocationMock;
exports.fireGeolocationListeners = fireGeolocationListeners;
exports.updatePosition = updatePosition;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * This is a partial of GeolocationPosition which is assignable to PositionMock
 */
var initialGeolocation = global.navigator.geolocation;
var currentPosition;
var listeners = [];
/**
 * This enables the geolocation mock
 */

function enableGeolocationMock() {
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn().mockImplementation(function () {
      return currentPosition;
    }),
    watchPosition: jest.fn().mockImplementation(function (listener) {
      listeners.push(listener);
    })
  };
}
/**
 * This disables the geolocation mock
 */


function disableGeolocationMock() {
  global.navigator.geolocation = initialGeolocation;
}
/**
 * Please note that openlayers seems to do some postprocessing on the heading value so it is not really possible to test
 * this here.
 * @param {PositionMock} [position]
 */


function fireGeolocationListeners(position) {
  var _position;

  position = (_position = position) !== null && _position !== void 0 ? _position : {
    coords: {
      latitude: -12.1,
      longitude: 12.3
    }
  };

  var _iterator = _createForOfIteratorHelper(listeners),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var listener = _step.value;
      listener(position);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
/**
 * Updates the current position of the geolocation
 * @param {PositionMock} position
 */


function updatePosition(position) {
  currentPosition = position;
}