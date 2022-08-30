import React from "react";
import { Heading, Flex, Box, Button } from "monday-ui-react-core"
import { Search } from "monday-ui-react-core/dist/allIcons"

export default class ActionBox extends React.Component {

    render() {
        let heading = this.props.heading;
        let actionName = this.props.actionName;
        let description = this.props.description;
        let icon = this.props.icon;
        let url = this.props.url;

        return (
            <Box rounded={Box.roundeds.MEDIUM} border={Box.borders.DEFAULT} padding={Box.paddings.XS} margin={Box.margins.MEDIUM}>
                <Flex align={Flex.align.CENTER} direction={Flex.directions.ROW} justify={Flex.justify.SPACE_BETWEEN}>
                    <Heading type={Heading.types.h2} value={heading} size="small" style={{ float: "left" }}></Heading>
                    <Button style={{ float: "right" }} size={Button.sizes.XS} leftIcon={icon ? icon : Search} onClick={
                        (e) => {
                            window.open(url, '_blank')
                        }
                    }>{actionName}</Button>
                </Flex>
                <p>{description}</p>
            </Box>
        );
    }
}
