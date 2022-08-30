import React from "react";
import "monday-ui-react-core/dist/main.css"
import YearOverviewGraph from "../Components/YearOverviewGraph"
import { Heading, } from "monday-ui-react-core"
import { eoyEmissionForecast } from "../Models/Calculators"
import { getMondayKeyVal, getStrategyDataFromMonday } from "../Models/MondayApiModel";
import mondaySdk from "monday-sdk-js";
import { ResponsiveContainer } from "recharts";


const monday = mondaySdk();

class YearOverviewWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // let query = () => monday.api(`query { boards { id, name } }`).then((boards) => {
        //     console.log(boards)
        // })

        // let baseContext = this.props.baseContext;
        // if (baseContext.data.boardId < 0) {
        //     getStrategyDataFromMonday().then((data) => {
        //         if(data.boardId >= 0){

        //         } else{

        //         }
        //     })
        //  }
        // else {

        // }
    }

    render() {
        let baseContext = this.props.baseContext;

        return <div className="App" style={{paddingLeft: 6}}>
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
