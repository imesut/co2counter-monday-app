import React from "react";
import "monday-ui-react-core/dist/main.css"
import {Heading } from "monday-ui-react-core"


import TargetGraph from "../Components/TargetGraph"

class NetZeroRoadmapWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let baseContext = this.props.baseContext;

        return <div className="App" style={{ display: "flex", flexDirection: "column", marginTop: 75 }}>
            <Heading value="Carbon Zero Roadmap" type={Heading.types.h3} size="medium" brandFont />
            <TargetGraph targets={baseContext.data.policy.breakdown} current={baseContext.data.this_year.emission}></TargetGraph>
        </div>

    }
}

export default NetZeroRoadmapWidget;
