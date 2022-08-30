import React from "react";
import { Heading, Flex } from "monday-ui-react-core"

export default class SectionTitle extends React.Component {

    render() {
        let icon = this.props.icon
        let title = this.props.title

        return (
            <Flex align={Flex.align.END} direction={Flex.directions.ROW} justify={Flex.justify.SPACE_BETWEEN}>
                <img src={icon} style={{ maxWidth: 80, maxHeight: 60, padding: 15 }}></img>
                <Heading type={Heading.types.h1} value={title} size="medium" brandFont />
            </Flex>
        );
    }
}
