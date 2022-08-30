import React from "react";

import "./App.css";
import "monday-ui-react-core/dist/main.css"
import YearOverviewGraph from "./Components/YearOverviewGraph"
import {Heading } from "monday-ui-react-core"
import { eoyEmissionForecast } from "./Models/Calculators"

class YearOverviewWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        let baseContext = this.props.context;
        return <div className="App" style={{ display: "flex", flexDirection: "column" }}>
            <Heading value="Year Status" type={Heading.types.h3} size="medium" brandFont />
            <YearOverviewGraph
                currentEmission={baseContext.data.this_year.emission}
                currentNeutralized={baseContext.data.this_year.neutralized}
                limitEmission={eoyEmissionForecast(baseContext.data.this_year.emission)}
                netEmission={baseContext.data.this_year.net}
            />
        </div>
    }
}

export default YearOverviewWidget;
