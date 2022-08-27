import React from "react";
import "./App.css";
// import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
import { Heading, MultiStepIndicator, Box, Flex, Steps, Button } from "monday-ui-react-core"
import { Dashboard, AddSmall, Search } from "monday-ui-react-core/dist/allIcons";

import { eoyEmissionForecast } from "./Models/Calculators";

import emissionIcon from './img/emission.png';
import targetIcon from './img/target.png';
import actionIcon from './img/action.png';


import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, ReferenceDot, PieChart, Pie, BarChart, Bar, Legend } from 'recharts';


// Views - Steps
import PromiseInput from "./Views/PromiseInput";

//Models
import { calculateEmissionTargets } from "./Models/Calculators";
import TargetGraph from "./Components/TargetGraph";
import YearOverviewGraph from "./Components/YearOverviewGraph";
import CategoryPieChart from "./Components/CategoryPieChart";
import GraphBoxWrapper from "./Components/GraphBoxWrapper";
import SectionTitle from "./Components/SectionTitle";
import ActionBox from "./Components/ActionBox";
import { contentColors } from "./Data/contentColors";


// const monday = mondaySdk();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.step0 = React.createRef();
        this.step1 = React.createRef();
        this.step2 = React.createRef();
        this.steps = [this.step0, this.step1, this.step2]
        // this.policySelectorRef = React.createRef();

        this.state = {
            settings: {},
            setupStep: 2,
            breakdownCustomizationTipDismissed: false
        };

        this.month = 8;

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

        console.log("repeats ?")
        // let step = this.state.setupStep;
        // this.steps[step].current.style.display = "flex";
        calculateEmissionTargets(this)

        // monday.api(`query { me { name } }`).then((res) => {
        //   this.setState({ name: res.data.me.name });
        //   console.log(res.data.me.name)
        // });
    }


    render() {
        // let step = this.state.setupStep;

        // console.log("repeatessss?")

        let emissionDistribution = [{ "category": "Electricity", "Emission": 50000, "Potential Reduction": 35000 },
        { "category": "Flights", "Emission": 20000, "Potential Reduction": 19000 },
        { "category": "Taxi", "Emission": 35000, "Potential Reduction": 33000 }]


        return <div className="App" style={{ display: "flex", flexDirection: "column" }}>


            <Flex direction={Flex.directions.ROW} justify={Flex.justify.SPACE_AROUND} align={Flex.align.START}>


                {/* COL 1 */}
                <Flex direction={Flex.directions.COLUMN}>

                    <SectionTitle icon={emissionIcon} title="Overview" />

                    <GraphBoxWrapper width={350} height={250} heading="Emission Breakdown">
                        <CategoryPieChart width="100%" height={250} data={emissionDistribution} />
                    </GraphBoxWrapper>

                    <div style={{ width: "100%", maxWidth: "30vw", textAlign: "center" }}>
                        <Box padding={Box.paddings.SMALL} rounded={Box.roundeds.MEDIUM} border={Box.borders.DEFAULT}>
                            <p>50 → 75 tonnes Carbon</p>
                            <p>Till end of the year: your pace will result in 75 tonnes.</p>
                            <p className="subtext">75 tonnes equals to <b>1000 m2</b> deforestation.</p>
                        </Box>
                    </div>

                    <GraphBoxWrapper width={350} height={100} heading="Emissions and Possible Savings">
                        <BarChart layout="vertical" barCategoryGap={0} data={emissionDistribution}>
                            <YAxis width={100} type="category" dataKey="category" />
                            <XAxis type="number" hide={true} />
                            <Bar dataKey="Emission" stackId="a" fill={contentColors["brand-blue"]} />
                            <Bar dataKey="Potential Reduction" stackId="a" fill={contentColors.dark_blue} />
                            <Legend />
                        </BarChart>
                    </GraphBoxWrapper>

                </Flex>

                {/* COL 2 */}

                <Flex direction={Flex.directions.COLUMN}>

                    <SectionTitle icon={targetIcon} title="Set Targets" />

                    <GraphBoxWrapper width={350} height={300} heading="Carbon Zero Roadmap">
                        <TargetGraph targets={this.data.policy.breakdown} current={this.data.this_year.emission}></TargetGraph>
                    </GraphBoxWrapper>

                    <PromiseInput context={this} data={this.data} />

                </Flex>

                {/* COL3 */}
                <Flex direction={Flex.directions.COLUMN}>
                    <SectionTitle icon={actionIcon} title="Take Action" />

                    <GraphBoxWrapper width={350} height={180} heading="Year Status">
                        <YearOverviewGraph
                            currentEmission={this.data.this_year.emission}
                            currentNeutralized={this.data.this_year.neutralized}
                            limitEmission={eoyEmissionForecast(this.data.this_year.emission)}
                            netEmission={this.data.this_year.net}
                        />
                    </GraphBoxWrapper>

                    <div className="actionBoxesContainer" >

                        <ActionBox heading="Avoid" actionName="Find Something to Avoid"
                            description="Where appropriate, avoid and cut the emission sources." />

                        <ActionBox heading="Reduce" actionName="Overview to Reduce"
                            description="If you cannot avoid it, how you can decrease your consumption, to reduce the emissions?" />

                        <ActionBox heading="Offset" actionName="Add an Offset Record"
                            description="When you cannot avoid or reduce, you can contribute to carbon negative projects worldwide, to make an impact in total." />

                    </div>



                </Flex>

            </Flex>

            <Button style={{ width: 120 }} kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL}>Something weird?</Button>
            <p className="subtext">Check out our guide to calculate your emissions better.</p>

        </div>
    }
}

export default App;
