"use strict";

var _user = _interopRequireDefault(require("../../../assets/user.png"));

var _TestUtil = _interopRequireDefault(require("../../Util/TestUtil"));

var _FloatingMapLogo = _interopRequireDefault(require("./FloatingMapLogo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('<FloatingMapLogo />', function () {
  var wrapper;
  beforeEach(function () {
    var props = {
      imageSrc: _user["default"]
    };
    wrapper = _TestUtil["default"].mountComponent(_FloatingMapLogo["default"], props);
  });
  it('is defined', function () {
    expect(_FloatingMapLogo["default"]).not.toBeUndefined();
  });
  it('can be rendered', function () {
    expect(wrapper).not.toBeUndefined();
  });
  it('contains img element with predefined class', function () {
    var imageElement = wrapper.find('img').getElement();
    expect(imageElement.props.className).toBe(wrapper.instance().className);
  });
  it('is not positioned absolutely by default', function () {
    var imageElement = wrapper.find('img').getElement();
    expect(imageElement.props.className).toBe(wrapper.instance().className);
  });
  it('passes style prop', function () {
    var props = {
      imageSrc: _user["default"],
      style: {
        backgroundColor: 'yellow',
        position: 'inherit'
      },
      className: 'peter'
    };
    wrapper = _TestUtil["default"].mountComponent(_FloatingMapLogo["default"], props);
    var imageElement = wrapper.find('img').getDOMNode();
    expect(imageElement).toHaveStyle('backgroundColor: yellow');
    expect(imageElement).toHaveClass(wrapper.instance().className);
    expect(imageElement).toHaveClass('peter');
    expect(imageElement).toHaveStyle('position: inherit');
  });
  it('passes position prop', function () {
    var props = {
      imageSrc: _user["default"],
      absolutelyPositioned: true,
      style: {
        backgroundColor: 'yellow'
      }
    };
    wrapper = _TestUtil["default"].mountComponent(_FloatingMapLogo["default"], props);
    var imageElement = wrapper.find('img').getDOMNode();
    expect(imageElement).toHaveClass(wrapper.instance().className);
    expect(imageElement).toHaveStyle('position: absolute');
    expect(imageElement).toHaveStyle('backgroundColor: yellow');
  });
  it('delegates image height to child img element', function () {
    var targetHeightNumber = 1909;
    var targetHeight = targetHeightNumber + 'px';
    wrapper.setProps({
      imageHeight: targetHeight
    });
    var imageElement = wrapper.find('img').getElement();
    expect(imageElement.props.height).toBe(targetHeight);
  });
});