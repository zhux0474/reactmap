import * as React from 'react';
import OlBaseLayer from 'ol/layer/Base';
export interface BaseProps {
    /**
     * An optional CSS class which should be added.
     */
    className?: string;
    /**
     * The layer you want to display the legend of.
     */
    layer: OlBaseLayer;
    /**
     * An object containing additional request params like "{HEIGHT: 400}" will
     * be transformed to "&HEIGHT=400" an added to the GetLegendGraphic request.
     */
    extraParams?: any;
    /**
     * Optional method that should be called when the image retrieval errors
     */
    onError?: () => void;
    /**
     * Optional error message that should be displayed when image retrieval
     * errors. Will remove the browsers default broken image
     */
    errorMsg?: string;
}
interface LegendState {
    /**
     * The legend url.
     */
    legendUrl: string;
    /**
     * Flag indicating if loading of the image source lead to an error
     */
    legendError: boolean;
}
export declare type LegendProps = BaseProps & React.HTMLAttributes<HTMLDivElement>;
/**
 * Class representing the Legend.
 *
 * @class Legend
 * @extends React.Component
 */
export declare class Legend extends React.Component<LegendProps, LegendState> {
    /**
     * The className added to this component.
     * @private
     */
    className: string;
    /**
     * Create the Legend.
     *
     * @constructs Legend
     */
    constructor(props: LegendProps);
    /**
     * Invoked immediately after updating occurs. This method is not called for
     * the initial render.
     *
     * @param prevProps The previous props.
     */
    componentDidUpdate(prevProps: LegendProps): void;
    /**
     * Get the corresponding legendGraphic of a layer. If layer is configured with
     * "legendUrl" this will be used. Otherwise a getLegendGraphic requestString
     * will be created by the MapUtil.
     *
     * @param layer The layer to get the legend graphic request for.
     * @param extraParams The extra params.
     */
    getLegendUrl(layer: OlBaseLayer, extraParams: any): any;
    /**
     * onError handler for the rendered img.
     */
    onError(e: any): void;
    /**
     * The render function.
     */
    render(): JSX.Element;
}
export default Legend;
