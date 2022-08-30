import React from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css"
import Setup from "./Setup"
import YearOverviewWidget from "./YearOverviewWidget";
import { calculateEmissionsFromExpenses, convertEmissionTypesToCategory } from "./Models/MondayDataModel"
import { getMondayKeyVal, getStrategyDataFromMonday, setStrategyDataToMonday } from "./Models/MondayApiModel"
import { eoyEmissionForecast } from "./Models/Calculators";
import { calculateAnnualTargets } from "./Models/Calculators"
import "./Models/MondayAdaptor"
import { initFromMonday } from "./Models/MondayAdaptor";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {},
            update: 0,
            lastUpdatedTimestamp: 1661854888326,
            breakdownCustomizationTipDismissed: false,
            expenseTableHref: "#",
            offsetFormHref: "#"

        };

        this.month = (new Date()).getMonth() + 1;

        this.data = {
            this_year: {
                emission: 105000,
                emissionLimit: 15750,
                neutralized: 35000,
                net: 70000,
                emissionDistribution: [
                    { "category": "Electricity", "Emission": 50000, "Potential Reduction": 35000 },
                    { "category": "Flights", "Emission": 20000, "Potential Reduction": 19000 },
                    { "category": "Taxi", "Emission": 35000, "Potential Reduction": 33000 },
                    { "category": "Taxiii", "Emission": 35000, "Potential Reduction": 33000 },
                    { "category": "Tttaxi", "Emission": 35000, "Potential Reduction": 33000 }
                ]
            },
            policy: {
                policy_selection: -1,
                policy_name: "",
                years: 4,
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
        initFromMonday(this)
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
