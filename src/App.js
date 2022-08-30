import React from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css"
import Setup from "./Setup"
import YearOverviewWidget from "./YearOverviewWidget";
import { calculateEmissionsFromExpenses, convertEmissionTypesToCategory } from "./Models/MondayDataModel"
import { getMondayKeyVal, getStrategyDataFromMonday, setStrategyDataToMonday } from "./Models/MondayApiModel"
import { eoyEmissionForecast } from "./Models/Calculators";
import { calculateAnnualTargets } from "./Models/Calculators"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {},
            update: 0,
            lastUpdatedTimestamp: 1661854888326,
            breakdownCustomizationTipDismissed: false
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
        let shouldCalculateAgain = () => {
            return new Promise((resolve, reject) => {
                calculateEmissionsFromExpenses().then((obj) => {
                    let emission = obj.totalEmissions
                    let offset = obj.offsetTotal

                    this.data.this_year.emission = emission
                    this.data.this_year.neutralized = offset
                    this.data.this_year.net = (emission - offset)
                    this.data.this_year.emissionLimit = eoyEmissionForecast(emission)
                    this.data.this_year.emissionDistribution = convertEmissionTypesToCategory(obj.emissionsByTypes)
                    setStrategyDataToMonday(this.data).then((isSaved) => {
                        console.log("strategy saving", isSaved)
                        resolve(isSaved)
                    })
                })
            })
        }

        getStrategyDataFromMonday().then((obj) => {
            // Calculate if never calculated or deleted
            if (obj === null) {
                shouldCalculateAgain().then(() => this.setState({ update: this.state.update }))
            } else {
                // last updated time 15 mins before
                getMondayKeyVal("lastUpdatedTimestamp").then((lastUpdatedTimestamp) => {
                    if (lastUpdatedTimestamp !== null) {
                        let now = Date.now()
                        if (now - lastUpdatedTimestamp > 15 * 60 * 1000) {
                            shouldCalculateAgain().then(() => {
                                this.setState({ lastUpdatedTimestamp: this.state.lastUpdatedTimestamp })
                            })
                        } else {
                            this.data = obj;
                            this.setState({ update: this.state.update })
                        }
                    } else {
                        this.data = obj;
                        this.setState({ update: this.state.update })
                    }
                })
            }
        })

        getMondayKeyVal("breakdownCustomizationTipDismissed").then((value) => {
            if (value !== null) {
                this.setState({ breakdownCustomizationTipDismissed: value })
            }
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
