import React from "react";

import { ResponsiveContainer } from 'recharts';
import { Box, Button, Heading } from "monday-ui-react-core"
import { Dashboard } from "monday-ui-react-core/dist/allIcons";

export default class GraphBoxWrapper extends React.Component {

    render() {

        let width = this.props.width;
        let height = this.props.height;
        let heading = this.props.heading;

        return (
            <>
                <Box padding={Box.paddings.MEDIUM} rounded={Box.roundeds.BIG} shadow={Box.shadows.SMALL} margin={Box.margins.MEDIUM}>
                    <Heading value={heading} type={Heading.types.h3} size="medium" brandFont />
                    <ResponsiveContainer width={width ? width : "100%"} minWidth={300} height={(height ? height : 150)}>
                        {this.props.children}
                    </ResponsiveContainer>
                    <Button leftIcon={Dashboard} style={{ float: "right" }} kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL}>Add to the Dashboard</Button>
                </Box>
            </>
        );
    }
}
