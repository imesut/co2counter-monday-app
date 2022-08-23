import React from "react";
import { Flex, Divider } from "monday-ui-react-core"

export default class SplitedDivider extends React.Component {

    render(){

        let w = this.props.width ? this.props.width : 600;
        let text = this.props.text ? this.props.text : "";

        return(
            <div style={{ width: w }}>
                <Flex>
                    <Divider /><span style={{ padding: 20, whiteSpace: "nowrap" }}>{text}</span><Divider />
                </Flex>
            </div>
        );
    }
    
}