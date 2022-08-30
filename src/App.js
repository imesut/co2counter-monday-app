import React from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css"
import Setup from "./Setup"
import YearOverviewWidget from "./YearOverviewWidget";
import { calculateEmissions } from "./Models/MondayDataModel"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {},
            breakdownCustomizationTipDismissed: false
        };

        this.month = (new Date()).getMonth() + 1;

        this.data = {
            this_year: {
                emission: 105000,
                neutralized: 35000,
                net: 70000
            },
            policy: {
                policy_selection: -1,
                policy_name: "",
                years: 3,
                endTarget: 0,
                totalToBeNeutralized: 0, // data.this_year.emission + endTarget
                breakdown: [
                    { year: 1, target: 78750 },
                    { year: 2, target: 52500 },
                    { year: 3, target: 26250 },
                    { year: 4, target: 0 }
                ]
            }
        }
    }

    componentDidMount() {
        // let objects = {
        //     "expensesByTypes": expensesByTypes,
        //     "calculator": calculator,
        //     "emissionsByTypes": emissionsByTypes,
        //     "totalEmissions": totalEmissions,
        //     "offsetTotal": offsetTotal
        // }
        calculateEmissions().then((obj) => {
            let emission = obj.totalEmissions
            let offset = obj.offsetTotal
            this.data.this_year.emission = emission
            this.data.this_year.neutralized = offset
            this.data.this_year.net = (emission - offset)
            this.setState({});
        })
    }

    render() {
        return (
            <>
                <Setup baseContext={this} />
                {/* <YearOverviewWidget context={this} /> */}
            </>
        )
    }
}

export default App;
