"use strict";

var _TestUtil = _interopRequireDefault(require("../../Util/TestUtil"));

var _Logger = _interopRequireDefault(require("@terrestris/base-util/dist/Logger"));

var _Vector = _interopRequireDefault(require("ol/source/Vector"));

var _Draw = _interopRequireDefault(require("ol/interaction/Draw"));

var _Select = _interopRequireDefault(require("ol/interaction/Select"));

var _Modify = _interopRequireDefault(require("ol/interaction/Modify"));

var _Translate = _interopRequireDefault(require("ol/interaction/Translate"));

var _Style = _interopRequireDefault(require("ol/style/Style"));

var _Stroke = _interopRequireDefault(require("ol/style/Stroke"));

var _Fill = _interopRequireDefault(require("ol/style/Fill"));

var _Circle = _interopRequireDefault(require("ol/style/Circle"));

var _Text = _interopRequireDefault(require("ol/style/Text"));

var _Feature = _interopRequireDefault(require("ol/Feature"));

var _Collection = _interopRequireDefault(require("ol/Collection"));

var _Point = _interopRequireDefault(require("ol/geom/Point"));

var _LineString = _interopRequireDefault(require("ol/geom/LineString"));

var _Polygon = _interopRequireDefault(require("ol/geom/Polygon"));

var _DigitizeButton = _interopRequireDefault(require("./DigitizeButton"));

var _MapUtil = _interopRequireDefault(require("@terrestris/ol-util/dist/MapUtil/MapUtil"));

var _AnimateUtil = _interopRequireDefault(require("@terrestris/ol-util/dist/AnimateUtil/AnimateUtil"));

var _ToggleButton = _interopRequireDefault(require("../ToggleButton/ToggleButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

describe('<DigitizeButton />', function () {
  var map;
  beforeEach(function () {
    map = _TestUtil["default"].createMap();
  });
  afterEach(function () {
    map = _TestUtil["default"].removeMap();
  });
  /**
   * Wraps the component.
   *
   * @return {Object} The wrapped component.
   */

  var setupWrapper = function setupWrapper() {
    var shallow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var defaultProps = {
      map: map,
      drawType: 'Point'
    };

    if (shallow) {
      return _TestUtil["default"].shallowComponent(_DigitizeButton["default"], defaultProps);
    } else {
      return _TestUtil["default"].mountComponent(_DigitizeButton["default"], defaultProps);
    }
  };
  /**
   * Returns a mock OLInteractionDraw of type Point.
   *
   * @return {Object} The mocked interaction.
   */


  var getMockDrawPointInteraction = function getMockDrawPointInteraction() {
    return new _Draw["default"]({
      source: new _Vector["default"](),
      type: 'Point',
      style: new _Style["default"]({
        stroke: new _Stroke["default"]({
          color: 'red',
          width: 2
        })
      })
    });
  };

  describe('#Basics', function () {
    it('is defined', function () {
      expect(_DigitizeButton["default"]).not.toBeUndefined();
    });
    it('can be rendered', function () {
      var wrapper = setupWrapper();
      expect(wrapper).not.toBeUndefined();
      expect(wrapper.find(_DigitizeButton["default"]).length).toEqual(1);
    });
    it('passes style property to wrapped ToggleButton', function () {
      var style = {
        backgroundColor: 'yellow'
      };
      var wrapper = setupWrapper();
      wrapper.setProps({
        style: style
      });
      var toggleButton = wrapper.find(_ToggleButton["default"]).get(0);
      expect(toggleButton).toBeDefined();
      expect(toggleButton.props.style).toEqual(style);
    });
    it('drawType or editType prop must be provided and have valid values', function () {
      var loggerSpy = jest.spyOn(_Logger["default"], 'warn');

      _TestUtil["default"].mountComponent(_DigitizeButton["default"], {
        map: map
      });

      expect(loggerSpy).toHaveBeenCalledTimes(1);
      expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('Neither "drawType" nor "editType" was provided. Digitize ' + 'button won\'t work properly!'));
      loggerSpy.mockRestore();
    });
  });
  describe('#Private methods', function () {
    describe('#onToggle', function () {
      it('calls passed onToggle in props it was provided', function () {
        expect.assertions(1);
        var wrapper = setupWrapper();
        var onToggle = jest.fn();
        wrapper.setProps({
          onToggle: onToggle
        }, function () {
          wrapper.instance().onToggle(true);
          expect(onToggle).toHaveBeenCalledTimes(1);
        });
      });
      it('creates a draw interaction on mount', function () {
        var wrapper = setupWrapper(true);
        var createDrawInteraction = jest.spyOn(wrapper.instance(), 'createDrawInteraction');
        expect(createDrawInteraction).toHaveBeenCalledTimes(0);
        wrapper.instance().componentDidMount();
        expect(createDrawInteraction).toHaveBeenCalledTimes(1);
        expect(wrapper.instance()._drawInteraction).toBeInstanceOf(_Draw["default"]);
        expect(wrapper.instance()._drawInteraction.getActive()).toBeFalsy();
        createDrawInteraction.mockRestore();
      });
      it('creates a select interaction on mount', function () {
        var wrapper = setupWrapper(true);
        wrapper.setProps({
          drawType: null,
          editType: 'Edit'
        });
        var createSelectInteraction = jest.spyOn(wrapper.instance(), 'createSelectInteraction');
        expect(createSelectInteraction).toHaveBeenCalledTimes(0);
        wrapper.instance().componentDidMount();
        expect(createSelectInteraction).toHaveBeenCalledTimes(1);
        expect(wrapper.instance()._selectInteraction).toBeInstanceOf(_Select["default"]);
        expect(wrapper.instance()._selectInteraction.getActive()).toBeFalsy();
        createSelectInteraction.mockRestore();
      });
      it('creates a modify interaction on mount', function () {
        var wrapper = setupWrapper(true);
        wrapper.setProps({
          drawType: null,
          editType: 'Edit'
        });
        var createModifyInteraction = jest.spyOn(wrapper.instance(), 'createModifyInteraction');
        expect(createModifyInteraction).toHaveBeenCalledTimes(0);
        wrapper.instance().componentDidMount();
        expect(createModifyInteraction).toHaveBeenCalledTimes(1);
        expect(wrapper.instance()._modifyInteraction).toBeInstanceOf(_Modify["default"]);
        expect(wrapper.instance()._modifyInteraction.getActive()).toBeFalsy();
        createModifyInteraction.mockRestore();
      });
      it('creates a translate interaction on mount', function () {
        var wrapper = setupWrapper(true);
        wrapper.setProps({
          drawType: null,
          editType: 'Edit'
        });
        var createTranslateInteraction = jest.spyOn(wrapper.instance(), 'createTranslateInteraction');
        expect(createTranslateInteraction).toHaveBeenCalledTimes(0);
        wrapper.instance().componentDidMount();
        expect(createTranslateInteraction).toHaveBeenCalledTimes(1);
        expect(wrapper.instance()._translateInteraction).toBeInstanceOf(_Translate["default"]);
        expect(wrapper.instance()._translateInteraction.getActive()).toBeFalsy();
        createTranslateInteraction.mockRestore();
      });
      it('removes all interactions and map listeners from the map on unmount', function () {
        var wrapper = setupWrapper();
        var defaultMapInteractionsLength = map.getInteractions().getLength();
        map.addInteraction(getMockDrawPointInteraction());
        map.on('pointermove', wrapper.instance().onPointerMove);
        wrapper.instance().componentDidMount();
        expect(map.getInteractions().getLength()).toBe(defaultMapInteractionsLength + 1); // Warning: using of private properties such `listeners_` could be
        // a bit fragile. We should probably find another way to get the
        // appropriate value.

        expect(map.listeners_.pointermove).toBeDefined();
        wrapper.instance().componentWillUnmount();
        expect(map.listeners_.pointermove).toBeUndefined();
        expect(map.getInteractions().getLength()).toBe(defaultMapInteractionsLength);
      });
      it('activates the draw interaction on toggle', function () {
        var wrapper = setupWrapper();
        var instance = wrapper.instance();
        expect(instance._drawInteraction.getActive()).toBeFalsy();
        instance.onToggle(true);
        expect(instance._drawInteraction.getActive()).toBeTruthy();
      });
      it('activates the edit interactions on toggle', function () {
        var wrapper = setupWrapper();
        wrapper.setProps({
          drawType: null,
          editType: 'Edit'
        });
        var instance = wrapper.instance();
        instance.componentDidMount();
        expect(instance._selectInteraction.getActive()).toBeFalsy();
        expect(instance._modifyInteraction.getActive()).toBeFalsy();
        expect(instance._translateInteraction.getActive()).toBeFalsy();
        instance.onToggle(true);
        expect(instance._selectInteraction.getActive()).toBeTruthy();
        expect(instance._modifyInteraction.getActive()).toBeTruthy();
        expect(instance._translateInteraction.getActive()).toBeTruthy();
      });
    });
    describe('#createDigitizeLayer', function () {
      it('creates a digitize vector layer, adds this to the map and assigns its value to state', function () {
        var digitizeLayer = _MapUtil["default"].getLayerByName(map, 'react-geo_digitize');

        expect(digitizeLayer).toBeUndefined();
        var wrapper = setupWrapper();
        digitizeLayer = _MapUtil["default"].getLayerByName(map, 'react-geo_digitize');
        expect(digitizeLayer).toBeDefined();
        expect(wrapper.instance()._digitizeLayer).toBe(digitizeLayer);
      });
    });
    describe('#digitizeStyleFunction', function () {
      it('returns a valid OlStyleStyle object depending on feature geometry type', function () {
        var wrapper = setupWrapper();
        var pointFeature = new _Feature["default"](new _Point["default"]([0, 0]));
        var lineFeature = new _Feature["default"](new _LineString["default"]([0, 0], [1, 1]));
        var polyFeature = new _Feature["default"](new _Polygon["default"]([0, 0], [0, 1], [1, 1], [0, 0]));
        var pointStyle = wrapper.instance().digitizeStyleFunction(pointFeature);
        expect(pointStyle instanceof _Style["default"]).toBeTruthy();
        expect(_typeof(pointStyle)).toBe('object');
        expect(pointStyle.getImage() instanceof _Circle["default"]).toBeTruthy();
        pointFeature.set('isLabel', true);
        var labelStyle = wrapper.instance().digitizeStyleFunction(pointFeature);
        expect(labelStyle instanceof _Style["default"]).toBeTruthy();
        expect(_typeof(labelStyle)).toBe('object');
        expect(labelStyle.getText() instanceof _Text["default"]).toBeTruthy();
        var lineStyle = wrapper.instance().digitizeStyleFunction(lineFeature);
        expect(lineStyle instanceof _Style["default"]).toBeTruthy();
        expect(_typeof(lineStyle)).toBe('object');
        expect(lineStyle.getStroke() instanceof _Stroke["default"]).toBeTruthy();
        var polyStyle = wrapper.instance().digitizeStyleFunction(polyFeature);
        expect(polyStyle instanceof _Style["default"]).toBeTruthy();
        expect(_typeof(polyStyle)).toBe('object');
        expect(polyStyle.getStroke() instanceof _Stroke["default"]).toBeTruthy();
        expect(polyStyle.getFill() instanceof _Fill["default"]).toBeTruthy();
      });
    });
    describe('#selectedStyleFunction', function () {
      it('returns a valid OlStyleStyle object to be used with selected features', function () {
        var wrapper = setupWrapper();
        wrapper.setProps({
          selectFillColor: '#ff0000',
          selectStrokeColor: '#0000ff'
        });
        var expectedStyle = wrapper.instance().selectedStyleFunction(new _Feature["default"]());
        expect(expectedStyle instanceof _Style["default"]).toBeTruthy();
        expect(expectedStyle.getStroke().getColor()).toBe(wrapper.props().selectStrokeColor);
        expect(expectedStyle.getFill().getColor()).toBe(wrapper.props().selectFillColor);
      });
    });
    describe('#createDrawInteraction', function () {
      it('creates OL draw interaction depending on provided drawType and sets its value to state', function () {
        var wrapper = setupWrapper();
        wrapper.setProps({
          drawType: 'Rectangle'
        });
        wrapper.instance().createDrawInteraction();
        expect(wrapper.instance()._drawInteraction.type_).toBe('Circle');
        wrapper.setProps({
          drawType: 'Text'
        });
        wrapper.instance().createDrawInteraction();
        expect(wrapper.instance()._drawInteraction.type_).toBe('Point');
      });
    });
    describe('#createSelectOrModifyInteraction', function () {
      // eslint-disable-next-line max-len
      it('creates OL select/modify/translate interaction depending on provided editType and sets its value(s) to state', function () {
        var wrapper = setupWrapper();
        wrapper.setProps({
          drawType: null,
          editType: 'Edit'
        });
        expect(wrapper.instance()._selectInteraction).toBeUndefined();
        wrapper.instance().createSelectInteraction();
        expect(wrapper.instance()._selectInteraction).toBeInstanceOf(_Select["default"]);
        expect(wrapper.instance()._modifyInteraction).toBeUndefined();
        wrapper.instance().createModifyInteraction();
        expect(wrapper.instance()._modifyInteraction).toBeInstanceOf(_Modify["default"]);
        expect(wrapper.instance()._translateInteraction).toBeUndefined();
        wrapper.instance().createTranslateInteraction();
        expect(wrapper.instance()._translateInteraction).toBeInstanceOf(_Translate["default"]);
      });
    });
    describe('#onFeatureRemove', function () {
      it('removes selected feature from the map', function () {
        var wrapper = setupWrapper();
        wrapper.setProps({
          drawType: null,
          editType: 'Edit'
        });
        var feat = new _Feature["default"]();
        var mockEvt = {
          selected: [feat]
        };
        wrapper.instance().createDigitizeLayer();
        wrapper.instance().createSelectInteraction();

        wrapper.instance()._digitizeLayer.getSource().addFeature(feat);

        wrapper.instance()._selectInteraction.getFeatures().push(feat);

        expect(wrapper.instance()._selectInteraction.getFeatures().getArray().length).toBe(1);
        expect(wrapper.instance()._digitizeLayer.getSource().getFeaturesCollection().getArray().length).toBe(1);
        wrapper.instance().onFeatureRemove(mockEvt);
        expect(wrapper.instance()._selectInteraction.getFeatures().getArray().length).toBe(0);
        expect(wrapper.instance()._digitizeLayer.getSource().getFeaturesCollection().getArray().length).toBe(0);
      });
    });
    describe('#onFeatureCopy', function () {
      it('calls moveFeature method from AnimateUtil class', function () {
        var wrapper = setupWrapper();
        var feat = new _Feature["default"](new _Point["default"]([0, 0]));
        var mockEvt = {
          selected: [feat]
        };
        wrapper.instance()._digitizeFeatures = new _Collection["default"]();
        var moveFeatureSpy = jest.spyOn(_AnimateUtil["default"], 'moveFeature');
        wrapper.instance().onFeatureCopy(mockEvt);
        expect(moveFeatureSpy).toHaveBeenCalledTimes(1);
        moveFeatureSpy.mockRestore();
      });
    });
    describe('#onModifyStart', function () {
      it('shows prompt for input text if a labeled feature is being modified', function () {
        var wrapper = setupWrapper();
        var feat = new _Feature["default"]();
        feat.set('isLabel', true);
        feat.setStyle(new _Style["default"]({
          text: new _Text["default"]()
        }));
        var mockEvt = {
          features: {}
        };

        mockEvt.features.getArray = function () {
          return [feat];
        };

        wrapper.instance().onModifyStart(mockEvt);
        expect(wrapper.instance()._digitizeTextFeature).toEqual(mockEvt.features.getArray()[0]);
        expect(wrapper.state().showLabelPrompt).toBeTruthy();
      });
    });
    describe('#handleTextAdding', function () {
      it('shows prompt for input text if a labeled feature is being handled', function () {
        var wrapper = setupWrapper();
        var feat = new _Feature["default"]();
        var mockEvt = {
          feature: feat
        };
        wrapper.instance().handleTextAdding(mockEvt);
        expect(wrapper.instance()._digitizeTextFeature).toEqual(mockEvt.feature);
        expect(wrapper.instance()._digitizeTextFeature.get('isLabel')).toBeTruthy();
        expect(wrapper.state().showLabelPrompt).toBeTruthy();
      });
    });
    describe('#onModalLabelOk', function () {
      it('hides prompt for input text', function () {
        var wrapper = setupWrapper();
        var feat = new _Feature["default"](new _Point["default"]([0, 0]));
        wrapper.setState({
          showLabelPrompt: true
        });
        feat.setStyle(new _Style["default"]({
          text: new _Text["default"]()
        }));
        feat.set('isLabel', true);
        wrapper.instance()._digitizeTextFeature = feat;
        wrapper.instance().onModalLabelOk();
        expect(wrapper.state().showLabelPrompt).toBeFalsy();
      });
    });
    describe('#onModalLabelCancel', function () {
      it('hides prompt for input text and removes _digitizeTextFeature from layer', function () {
        var wrapper = setupWrapper();
        var feat = new _Feature["default"](new _Point["default"]([0, 0]));
        wrapper.setState({
          showLabelPrompt: true
        });
        feat.setStyle(new _Style["default"]({
          text: new _Text["default"]()
        }));
        feat.set('isLabel', true);
        wrapper.instance()._digitizeTextFeature = feat;
        wrapper.instance()._digitizeFeatures = new _Collection["default"]();

        wrapper.instance()._digitizeFeatures.push(feat);

        expect(wrapper.instance()._digitizeFeatures.getLength()).toBe(1);
        wrapper.instance().onModalLabelCancel();
        expect(wrapper.state().showLabelPrompt).toBeFalsy();
      });
    });
    describe('#setTextOnFeature', function () {
      it('sets label text on feature', function () {
        var wrapper = setupWrapper();
        var feat = new _Feature["default"](new _Point["default"]([0, 0]));
        var label = 'label';
        wrapper.setState({
          textLabel: label
        });
        feat.setStyle(new _Style["default"]({
          text: new _Text["default"]()
        }));
        feat.set('isLabel', true);
        wrapper.instance().setTextOnFeature(feat);
        expect(feat.get('label')).toBe(label);
      });
    });
    describe('#onLabelChange', function () {
      it('sets state value for textLabel', function () {
        var wrapper = setupWrapper();
        var mockEvt = {
          target: {
            value: 'label'
          }
        };
        wrapper.instance().onLabelChange(mockEvt);
        expect(wrapper.state().textLabel).toBe(mockEvt.target.value);
      });
    });
  });
});