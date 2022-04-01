"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var React = _interopRequireWildcard(require("react"));

var _TestUtil = _interopRequireDefault(require("../../Util/TestUtil"));

var _Titlebar = _interopRequireDefault(require("./Titlebar"));

var _SimpleButton = _interopRequireDefault(require("../../Button/SimpleButton/SimpleButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('<Titlebar />', function () {
  it('is defined', function () {
    expect(_Titlebar["default"]).not.toBeUndefined();
  });
  it('can be rendered', function () {
    var wrapper = _TestUtil["default"].mountComponent(_Titlebar["default"]);

    expect(wrapper).not.toBeUndefined();
  });
  it('adds a passed className', function () {
    var wrapper = _TestUtil["default"].mountComponent(_Titlebar["default"], {
      className: 'podolski'
    });

    expect(wrapper.instance().props.className).toContain('podolski');
  });
  it('renders the title', function () {
    var wrapper = _TestUtil["default"].mountComponent(_Titlebar["default"], {
      children: 'Testtitle'
    });

    var title = wrapper.find('span.title');
    expect(title.length).toBe(1);
  });
  it('renders the controls (if set)', function () {
    var wrapper = _TestUtil["default"].mountComponent(_Titlebar["default"], {
      children: 'Testtitle'
    });

    expect(wrapper.find('span.controls').length).toBe(0);

    var wrapperWithTools = _TestUtil["default"].mountComponent(_Titlebar["default"], {
      children: 'Testtitle',
      tools: [/*#__PURE__*/React.createElement(_SimpleButton["default"], {
        iconName: "times",
        key: "close-tool",
        size: "small"
      })]
    });

    expect(wrapperWithTools.find('span.controls').length).toBe(1);
  });
});