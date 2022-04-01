import * as React from 'react';
import OlLayerBase from 'ol/layer/Base';
import { SliderSingleProps } from 'antd/lib/slider';
import { ArrayTwoOrMore } from '@terrestris/base-util/dist/types';
interface DefaultProps {
    /**
     * The default value(s).
     */
    defaultValue: number;
    /**
     * layer property that will define the name shown on the lables. Defaults to 'name'.
     */
    nameProperty: string;
}
/**
 *
 * @export
 * @interface TimeSliderProps
 */
export interface BaseProps {
    /**
     * The layers that should be handled.
     *
     */
    layers: ArrayTwoOrMore<OlLayerBase>;
    /**
     * An optional CSS class which should be added.
     */
    className?: string;
}
export declare type MultiLayerSliderProps = BaseProps & Partial<DefaultProps> & SliderSingleProps;
/**
 * Slider that changes opacity on a set of layers.
 *
 * @class The MultiLayerSlider
 * @extends React.Component
 */
declare class MultiLayerSlider extends React.Component<MultiLayerSliderProps> {
    static defaultProps: DefaultProps;
    /**
     * The className added to this component.
     * @private
     */
    className: string;
    /**
     * The constructor.
     *
     * @constructs MultiLayerSlider
     * @param props The properties.
     */
    constructor(props: MultiLayerSliderProps);
    /**
     * Formats the tip for the slider.
     * @param value The slider value
     * @return The formatted tip value
     */
    formatTip(value: number): string;
    /**
     * Called when the value of the slider changed.
     */
    valueUpdated(value: number): void;
    /**
     * Gets the opacity for a given slider value
     * @param value The current slider value
     * @return The opacity
     */
    getOpacityForValue(value: number): number;
    /**
     * Gets the matching index of the layer array for a given slider value
     * @param value the current slider value
     * @return The layer array index
     */
    getLayerIndexForSliderValue(value: number): number;
    /**
     * Creates the marks used with the slider based on the layers names.
     * @return The marks object
     */
    getMarks(): {};
    /**
     * The render function.
     */
    render(): JSX.Element;
}
export default MultiLayerSlider;
