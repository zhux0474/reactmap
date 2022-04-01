"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _user = _interopRequireDefault(require("../../assets/user.png"));

var _UserChip = _interopRequireDefault(require("./UserChip"));

var _react = require("@testing-library/react");

var React = _interopRequireWildcard(require("react"));

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('<UserChip />', function () {
  it('is defined', function () {
    expect(_UserChip["default"]).not.toBeUndefined();
  });
  it('can be rendered', function () {
    var _render = (0, _react.render)( /*#__PURE__*/React.createElement(_UserChip["default"], null)),
        container = _render.container;

    expect(container).toBeVisible();
  });
  it('determines initials from given user name', function () {
    (0, _react.render)( /*#__PURE__*/React.createElement(_UserChip["default"], {
      userName: "Shinji Kagawa"
    }));

    var chip = _react.screen.getByText('SK');

    expect(chip).toBeVisible();
  });
  it('uses imageSrc if image is given', function () {
    (0, _react.render)( /*#__PURE__*/React.createElement(_UserChip["default"], {
      imageSrc: _user["default"]
    }));

    var userImage = _react.screen.getByRole('img');

    expect(userImage).toBeVisible();
    expect(userImage).toHaveAttribute('src', _user["default"]);
  });
  it('uses initials if image is not given', function () {
    (0, _react.render)( /*#__PURE__*/React.createElement(_UserChip["default"], {
      userName: "Shinji Kagawa"
    }));

    var image = _react.screen.queryByRole('img');

    expect(image).not.toBeInTheDocument();
  });
  it('should render a dropdown', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var chip, menu;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _react.render)( /*#__PURE__*/React.createElement(_UserChip["default"], {
              userName: "Shinji Kagawa",
              userMenu: /*#__PURE__*/React.createElement("div", {
                role: "menu"
              }, "Example menu")
            }));
            chip = _react.screen.getByText('SK').parentElement;

            _userEvent["default"].click(chip);

            menu = _react.screen.getByText('Example menu'); // `toBeVisible` does not work because antd seems to be in the way

            expect(menu).toBeInTheDocument();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('should not render a dropdown for invalid configuration', function () {
    (0, _react.render)( /*#__PURE__*/React.createElement(_UserChip["default"], {
      userName: "Shinji Kagawa",
      userMenu: null
    }));

    var menu = _react.screen.queryByRole('menu');

    expect(menu).not.toBeInTheDocument();
  });
  it('should pass style prop', function () {
    (0, _react.render)( /*#__PURE__*/React.createElement(_UserChip["default"], {
      userName: "Shinji Kagawa",
      style: {
        backgroundColor: 'yellow'
      }
    }));

    var chip = _react.screen.getByText('Shinji Kagawa').parentElement;

    expect(chip).toHaveStyle({
      backgroundColor: 'yellow'
    });
  });
});