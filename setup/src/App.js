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


import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, ReferenceDot, PieChart, Pie, BarChart, Bar } from 'recharts';


// Views - Steps
import SetupStep0 from "./Views/SetupStep0"
import SetupStep1 from "./Views/SetupStep1";
import PromiseInput from "./Views/PromiseInput";

// Data Lists
import SetupSteps from "./Data/DynamicLists";

//Models
import changeStep from "./Models/ViewModels";
import { calculateEmissionTargets } from "./Models/Calculators";
import TargetGraph from "./Components/TargetGraph";
import YearOverviewGraph from "./Components/YearOverviewGraph";
import { Divider } from "monday-ui-react-core/dist/icons";

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
                neutralized: 5000,
                net: 100000
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

        // console.log("repeats ?")
        // let step = this.state.setupStep;
        // this.steps[step].current.style.display = "flex";
        // calculateEmissionTargets(this)

        // monday.api(`query { me { name } }`).then((res) => {
        //   this.setState({ name: res.data.me.name });
        //   console.log(res.data.me.name)
        // });
    }


    render() {
        // let step = this.state.setupStep;

        // console.log("repeatessss?")

        let pieData = [{ "name": "Group A", "value": 400 }, { "name": "Group B", "value": 300 }]
        let barData = [{ "name": "Group A", "value": 400 }, { "name": "Group B", "value": 300 }]


        return <div className="App" style={{ display: "flex", flexDirection: "column" }}>


            <Flex direction={Flex.directions.ROW} justify={Flex.justify.SPACE_AROUND} align={Flex.align.START}>


                {/* COL 1 */}
                <Flex direction={Flex.directions.COLUMN}>

                    <Flex align={Flex.align.END} direction={Flex.directions.ROW} justify={Flex.justify.SPACE_BETWEEN}>
                        <img src={emissionIcon} style={{ maxWidth: 100, maxHeight: 80, padding: 15 }}></img>
                        <Heading type={Heading.types.h1} value="Overview" size="medium" brandFont />

                    </Flex>

                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart width={400} height={250}>
                            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                        </PieChart>
                    </ResponsiveContainer>



                    <div style={{ width: "100%", maxWidth: "30vw", textAlign: "center" }}>
                        <Box padding={Box.paddings.SMALL} rounded={Box.roundeds.SMALL} border={Box.borders.DEFAULT}>
                            <p>50 → 75 tonnes Carbon</p>
                            <p>Till end of the year: your pace will result in 75 tonnes.</p>
                            <p className="subtext">75 tonnes equals to <b>1000 m2</b> deforestation.</p>


                        </Box>
                    </div>


                    <Box padding={Box.paddings.MEDIUM} rounded={Box.roundeds.SMALL} shadow={Box.shadows.SMALL} margin={Box.margins.MEDIUM}>
                        <ResponsiveContainer width={"100%"} minWidth={250} height={150}>
                            <BarChart layout="vertical" barCategoryGap={10} data={barData}>
                                <YAxis type="category" dataKey="name" />
                                <XAxis type="number" hide={true} />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>

                        <Button leftIcon={Dashboard} style={{ float: "right" }} kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL}>Add to the Dashboard</Button>
                    </Box>







                </Flex>

                {/* COL 2 */}

                <Flex direction={Flex.directions.COLUMN}>

                    <Flex align={Flex.align.END} direction={Flex.directions.ROW} justify={Flex.justify.SPACE_BETWEEN}>
                        <img src={targetIcon} style={{ maxWidth: 100, maxHeight: 80, padding: 15 }}></img>
                        <Heading type={Heading.types.h1} value="Set Targets" size="medium" brandFont />
                    </Flex>

                    <Box padding={Box.paddings.SMALL} rounded={Box.roundeds.SMALL} shadow={Box.shadows.SMALL} margin={Box.margins.MEDIUM}>
                        <TargetGraph width={300} targets={this.data.policy.breakdown} current={this.data.this_year.emission}></TargetGraph>
                        <Button leftIcon={Dashboard} style={{ float: "right" }} kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL}>Add to the Dashboard</Button>
                    </Box>


                    <PromiseInput context={this} data={this.data} />






                </Flex>

                {/* COL3 */}
                <Flex direction={Flex.directions.COLUMN}>

                    <Flex align={Flex.align.END} direction={Flex.directions.ROW} justify={Flex.justify.SPACE_BETWEEN}>
                        <img src={actionIcon} style={{ maxWidth: 100, maxHeight: 80, padding: 15 }}></img>
                        <Heading type={Heading.types.h1} value="Take Action" size="medium" brandFont />
                    </Flex>

                    <div className="actionBoxesContainer" >

                        <Box rounded={Box.roundeds.SMALL} border={Box.borders.DEFAULT}
                            padding={Box.paddings.XS} margin={Box.margins.MEDIUM}>
                            <Flex align={Flex.align.CENTER} direction={Flex.directions.ROW} justify={Flex.justify.SPACE_BETWEEN}>
                                <Heading type={Heading.types.h2} value="Avoid" size="small" style={{ float: "left" }}></Heading>
                                <Button style={{ float: "right" }} size={Button.sizes.XS} leftIcon={Search}>Find Something to Avoid</Button>
                            </Flex>
                            <p>Where appropriate, avoid and cut the emission sources.</p>
                        </Box>


                        <Box rounded={Box.roundeds.SMALL} border={Box.borders.DEFAULT}
                            padding={Box.paddings.XS} margin={Box.margins.MEDIUM}>
                            <Flex align={Flex.align.CENTER} direction={Flex.directions.ROW} justify={Flex.justify.SPACE_BETWEEN}>
                                <Heading type={Heading.types.h2} value="Reduce" size="small" style={{ float: "left" }}></Heading>
                                <Button style={{ float: "right" }} size={Button.sizes.XS} leftIcon={Search}>Overview to Reduce</Button>
                            </Flex>
                            <p>If you cannot avoid it, how you can decrease your consumption, to reduce the emissions?</p>
                        </Box>

                        <Box rounded={Box.roundeds.SMALL} border={Box.borders.DEFAULT}
                            padding={Box.paddings.XS} margin={Box.margins.MEDIUM}>
                            <Flex align={Flex.align.CENTER} direction={Flex.directions.ROW} justify={Flex.justify.SPACE_BETWEEN}>
                                <Heading type={Heading.types.h2} value="Offset" size="small" style={{ float: "left" }}></Heading>
                                <Button style={{ float: "right" }} size={Button.sizes.XS} leftIcon={AddSmall}>Add an Offset Record</Button>
                            </Flex>
                            <p>Where appropriate, avoid and cut the emission sources.</p>
                        </Box>

                    </div>


                    <Box padding={Box.paddings.SMALL} rounded={Box.roundeds.SMALL} shadow={Box.shadows.SMALL} margin={Box.margins.MEDIUM}>
                        <YearOverviewGraph
                            currentEmission={this.data.this_year.emission}
                            currentNeutralized={this.data.this_year.neutralized}
                            limitEmission={eoyEmissionForecast(this.data.this_year.emission)}
                            netEmission={this.data.this_year.net}
                        />
                        <Button leftIcon={Dashboard} style={{ float: "right" }} kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL}>Add to the Dashboard</Button>
                    </Box>








                </Flex>









            </Flex>

            <Button style={{ width: 120 }} kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL}>Something weird?</Button>
            <p className="subtext">Check out our guide to calculate your emissions better.</p>

            {/* <>
            <Flex direction={Flex.directions.COLUMN}>
                <Heading type={Heading.types.h1} value="Setup Carbon Policy Tracker" />                
                <MultiStepIndicator
                    className="monday-storybook-multiStepIndicator_big-size"
                    steps={SetupSteps(step)}
                    textPlacement={MultiStepIndicator.textPlacements.VERTICAL}
                    onClick={ (step) => {changeStep(this, step - 1)} } />
            </Flex>
            
            <Box
                className="boxWrapper"
                shadow={Box.shadows.MEDIUM}
                border={Box.borders.DEFAULT}
                rounded={Box.roundeds.MEDIUM}
                backgroundColor={Box.backgroundColors.GREY_BACKGROUND_COLOR}>
                
                
                <Flex ref={this.step0} style={{display: "none"}} justify={Flex.justify.SPACE_AROUND}>
                    <SetupStep0 />
                </Flex>

                
                <Flex ref={this.step1} style={{display: "none"}}
                    direction={Flex.directions.COLUMN} justify={Flex.justify.SPACE_AROUND}>
                    <SetupStep1 />
                </Flex>

                
                <Flex ref={this.step2} style={{display: "none"}}
                    direction={Flex.directions.COLUMN} justify={Flex.justify.SPACE_AROUND}>
                    <SetupStep2 context={this} data={this.data} />            
                </Flex>

            </Box>

            <div style={{width: "inherit"}} >
                <Flex direction={Flex.directions.COLUMN}>
                    <Steps steps={[<div />, <div />, <div />]} activeStepIndex={step}
                    onChangeActiveStep={ (event, stepNo) => {changeStep(this, stepNo)} }/>
                </Flex>
            </div>
            </> */}

        </div>
    }
}

export default App;
