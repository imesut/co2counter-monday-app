import React from "react";
import "./App.css";
// import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
import { Heading, MultiStepIndicator, Box, Flex, Steps, Button } from "monday-ui-react-core"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, ReferenceDot, PieChart, Pie, BarChart, Bar } from 'recharts';


// Views - Steps
import SetupStep0 from "./Views/SetupStep0"
import SetupStep1 from "./Views/SetupStep1";
import SetupStep2 from "./Views/SetupStep2";

// Data Lists
import SetupSteps from "./Data/DynamicLists";

//Models
import changeStep from "./Models/ViewModels";
import { calculateEmissionTargets } from "./Models/Calculators";
import TargetGraph from "./Components/TargetGraph";

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


            <Flex direction={Flex.directions.ROW}>

                <Flex direction={Flex.directions.COLUMN}>

                    <>
                        <img src="img/"></img>
                        <Heading type={Heading.types.h1} value="Overview" size="medium" brandFont />
                    </>

                    <PieChart width={400} height={250}>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                    </PieChart>

                    

                    <div style={{ width: 300, height: 40, textAlign: "center" }}>
                        <Box padding={Box.paddings.SMALL} rounded={Box.roundeds.SMALL} border={Box.borders.DEFAULT}>50 tonnes Carbon</Box>
                        <em className="subtext">Equals to 1000 m2 deforestation.</em>
                    </div>



                    <BarChart style={{ margin: 20 }} layout="vertical" barCategoryGap={10} width={400} height={200} data={barData}>
                        <YAxis type="category" dataKey="name" />
                        <XAxis type="number" hide={true} />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>



                </Flex>





             



            </Flex>

            <Button style={{ width: 150 }} kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL}>Something weird?</Button>
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
