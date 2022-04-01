"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var React = _interopRequireWildcard(require("react"));

var _LayerTreeNode = _interopRequireDefault(require("./LayerTreeNode"));

var _rcTree = _interopRequireDefault(require("rc-tree"));

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('<LayerTreeNode />', function () {
  var defaultProps = {
    inResolutionRange: true,
    filterTreeNode: function filterTreeNode(ftn) {
      return ftn;
    }
  };
  it('is defined', function () {
    expect(_LayerTreeNode["default"]).not.toBeUndefined();
  });
  it('can be rendered (inside a Tree component)', function () {
    var Cmp = /*#__PURE__*/React.createElement(_rcTree["default"], null, /*#__PURE__*/React.createElement(_LayerTreeNode["default"], defaultProps));
    var wrapper = (0, _enzyme.mount)(Cmp);
    expect(wrapper).not.toBeUndefined();
  });
});