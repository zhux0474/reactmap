"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var React = _interopRequireWildcard(require("react"));

var _react2 = require("@testing-library/react");

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var testChildren = [/*#__PURE__*/React.createElement("div", {
  key: "testdiv1",
  id: "testdiv1"
}), /*#__PURE__*/React.createElement("div", {
  key: "testdiv2",
  id: "testdiv2"
}), /*#__PURE__*/React.createElement("div", {
  key: "testdiv3",
  id: "testdiv3"
})];
describe('<Toolbar />', function () {
  it('is defined', function () {
    expect(_Toolbar["default"]).not.toBeUndefined();
  });
  it('can be rendered', function () {
    var _render = (0, _react2.render)( /*#__PURE__*/React.createElement(_Toolbar["default"], null)),
        container = _render.container;

    expect(container).toBeVisible();
  });
  it('contains div having class "horizontal-toolbar" by default', function () {
    (0, _react2.render)( /*#__PURE__*/React.createElement(_Toolbar["default"], null));

    var toolBar = _react2.screen.getByRole('toolbar');

    expect(toolBar).toHaveClass('horizontal-toolbar');
  });
});
describe('<Toolbar /> - CSS-class "vertical-toolbar"', function () {
  it('contains div having class "vertical-toolbar"', function () {
    (0, _react2.render)( /*#__PURE__*/React.createElement(_Toolbar["default"], {
      alignment: "vertical"
    }));

    var toolBar = _react2.screen.getByRole('toolbar');

    expect(toolBar).toHaveClass('vertical-toolbar');
  });
  it('contains three child elements', function () {
    (0, _react2.render)( /*#__PURE__*/React.createElement(_Toolbar["default"], {
      alignment: "vertical"
    }, testChildren));

    var children = _react2.screen.getByRole('toolbar').children;

    expect(children).toHaveLength(3);
  });
});
describe('<Toolbar /> - CSS-class "horizontal-toolbar"', function () {
  it('contains div having class "horizontal-toolbar"', function () {
    (0, _react2.render)( /*#__PURE__*/React.createElement(_Toolbar["default"], {
      alignment: "horizontal"
    }));

    var toolBar = _react2.screen.getByRole('toolbar');

    expect(toolBar).toHaveClass('horizontal-toolbar');
  });
  it('contains three child elements', function () {
    (0, _react2.render)( /*#__PURE__*/React.createElement(_Toolbar["default"], {
      alignment: "horizontal"
    }, testChildren));

    var children = _react2.screen.getByRole('toolbar').children;

    expect(children).toHaveLength(3);
  });
});