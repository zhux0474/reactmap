"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _ToggleButton = _interopRequireDefault(require("./ToggleButton"));

var _react = require("@testing-library/react");

var React = _interopRequireWildcard(require("react"));

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('<ToggleButton />', function () {
  it('is defined', function () {
    expect(_ToggleButton["default"]).not.toBeUndefined();
  });
  it('can be rendered', function () {
    var _render = (0, _react.render)( /*#__PURE__*/React.createElement(_ToggleButton["default"], null)),
        container = _render.container;

    expect(container).toBeVisible();
  });
  it('isn\'t pressed by default', function () {
    (0, _react.render)( /*#__PURE__*/React.createElement(_ToggleButton["default"], null));

    var button = _react.screen.getByRole('button');

    expect(button).not.toHaveClass('btn-pressed');
  });
  it('sets the pressed class if pressed prop is set to true initially', function () {
    (0, _react.render)( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      pressed: true
    }));

    var button = _react.screen.getByRole('button');

    expect(button).toHaveClass('btn-pressed');
  });
  it('ignores the onClick callback', function () {
    var onClick = jest.fn();
    (0, _react.render)( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      pressed: true,
      onClick: onClick
    }));

    var button = _react.screen.getByRole('button');

    _userEvent["default"].click(button);

    expect(onClick).not.toHaveBeenCalled();
  });
  it('toggles the pressed class if the pressed prop has changed', function () {
    var _render2 = (0, _react.render)( /*#__PURE__*/React.createElement(_ToggleButton["default"], null)),
        rerender = _render2.rerender;

    var button = _react.screen.getByRole('button');

    expect(button).not.toHaveClass('btn-pressed');
    rerender( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      pressed: true
    }));
    expect(button).toHaveClass('btn-pressed'); // Nothing should happen if the prop hasn't changed.

    rerender( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      pressed: true
    }));
    expect(button).toHaveClass('btn-pressed');
    rerender( /*#__PURE__*/React.createElement(_ToggleButton["default"], null));
    expect(button).not.toHaveClass('btn-pressed');
  }); // eslint-disable-next-line max-len

  it('calls the given toggle callback method if the pressed prop has changed initially to true', function () {
    var onToggle = jest.fn();

    var _render3 = (0, _react.render)( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      onToggle: onToggle
    })),
        rerender = _render3.rerender;

    rerender( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      pressed: true,
      onToggle: onToggle
    }));
    expect(onToggle).toHaveBeenCalledTimes(1); // If the prop has been changed, no click evt is available.

    expect(onToggle).toHaveBeenCalledWith(true, null);
    rerender( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      pressed: false,
      onToggle: onToggle
    }));
    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveBeenCalledWith(false, null); // Nothing should happen if the prop hasn't changed.

    rerender( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      pressed: false,
      onToggle: onToggle
    }));
    expect(onToggle).toHaveBeenCalledTimes(2);
    rerender( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      pressed: true,
      onToggle: onToggle
    }));
    expect(onToggle).toHaveBeenCalledTimes(3);
    expect(onToggle).toHaveBeenCalledWith(true, null);
  }); // eslint-disable-next-line max-len

  it('calls the given toggle callback method if the pressed prop has changed to false (from being false by default)', function () {
    var onToggle = jest.fn();

    var _render4 = (0, _react.render)( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      onToggle: onToggle
    })),
        rerender = _render4.rerender; // Nothing should happen if the prop hasn't changed.
    // (pressed property is false by default)


    rerender( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      pressed: false,
      onToggle: onToggle
    }));
    expect(onToggle).toHaveBeenCalledTimes(0);
    rerender( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      pressed: true,
      onToggle: onToggle
    }));
    expect(onToggle).toHaveBeenCalledTimes(1); // If the prop has been changed, no click evt is available.

    expect(onToggle).toHaveBeenCalledWith(true, null); // Nothing should happen if the prop hasn't changed.

    rerender( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      pressed: true,
      onToggle: onToggle
    }));
    expect(onToggle).toHaveBeenCalledTimes(1);
    rerender( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      pressed: false,
      onToggle: onToggle
    }));
    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveBeenCalledWith(false, null);
  });
  it('cleans the last click event if not available', function () {
    var onToggle = jest.fn();
    var clickEvtMock = expect.objectContaining({
      type: 'click'
    });

    var _render5 = (0, _react.render)( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      onToggle: onToggle
    })),
        rerender = _render5.rerender;

    var button = _react.screen.getByRole('button');

    rerender( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      pressed: true,
      onToggle: onToggle
    }));
    expect(onToggle).toHaveBeenCalledTimes(1); // If the prop has been changed, no click evt is available.

    expect(onToggle).toHaveBeenCalledWith(true, null); // Pressed will now become false.

    _userEvent["default"].click(button);

    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveBeenCalledWith(false, clickEvtMock);
    rerender( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      pressed: true,
      onToggle: onToggle
    })); // If the prop has been changed, no click evt is available.

    expect(onToggle).toHaveBeenCalledTimes(3);
    expect(onToggle).toHaveBeenCalledWith(true, null);
  });
  it('toggles the pressed class on click', function () {
    (0, _react.render)( /*#__PURE__*/React.createElement(_ToggleButton["default"], null));

    var button = _react.screen.getByRole('button');

    expect(button).not.toHaveClass('btn-pressed');

    _userEvent["default"].click(button);

    expect(button).toHaveClass('btn-pressed');

    _userEvent["default"].click(button);

    expect(button).not.toHaveClass('btn-pressed');

    _userEvent["default"].click(button);

    expect(button).toHaveClass('btn-pressed');
  });
  it('calls the given toggle callback method on click', function () {
    var onToggle = jest.fn();
    var clickEvtMock = expect.objectContaining({
      type: 'click'
    });
    (0, _react.render)( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      onToggle: onToggle
    }));

    var button = _react.screen.getByRole('button');

    _userEvent["default"].click(button);

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(true, clickEvtMock);

    _userEvent["default"].click(button);

    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveBeenCalledWith(false, clickEvtMock);

    _userEvent["default"].click(button);

    expect(onToggle).toHaveBeenCalledTimes(3);
    expect(onToggle).toHaveBeenCalledWith(true, clickEvtMock);
  });
  it('can be rendered if iconName is set and no text or icon is set with the property pressed set to true', function () {
    var _render6 = (0, _react.render)( /*#__PURE__*/React.createElement(_ToggleButton["default"], {
      iconName: 'some-icon-name',
      pressedIconName: undefined,
      pressed: true
    })),
        container = _render6.container;

    expect(container).toBeVisible();
  });
});