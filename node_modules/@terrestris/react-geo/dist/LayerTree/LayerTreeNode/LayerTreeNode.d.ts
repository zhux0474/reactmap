import * as React from 'react';
import './LayerTreeNode.less';
import { AntTreeNodeProps } from 'antd/lib/tree';
export interface BaseProps {
    inResolutionRange?: boolean;
}
export declare type LayerTreeNodeProps = BaseProps & AntTreeNodeProps;
/**
 * Class representing a layer tree node
 */
declare class LayerTreeNode extends React.PureComponent<LayerTreeNodeProps> {
    static isTreeNode: number;
    /**
     * The render function.
     *
     * @return The element.
     */
    render(): JSX.Element;
}
export default LayerTreeNode;
