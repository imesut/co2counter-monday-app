import React from "react";
import "./App.css";
// import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
import { Heading, MultiStepIndicator, Box, Flex, Steps } from "monday-ui-react-core"

// Views - Steps
import SetupStep0 from "./Views/SetupStep0"
import SetupStep2 from "./Views/SetupStep2";

// Data Lists
import SetupSteps from "./Data/DynamicLists";

//Models
import changeStep from "./Models/ViewModels";
import calculateEmissionTargets from "./Models/Calculators";

// const monday = mondaySdk();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.step0 = React.createRef();
        this.step1 = React.createRef();
        this.step2 = React.createRef();
        this.steps = [this.step0, this.step1, this.step2]
        this.policySelectorRef = React.createRef();

        this.state = {
            settings: {},
            setupStep: 2
        };

        this.month = 8;

        this.data = {
            this_year: {
                emission: 105000
            },
            policy: {
                policy_selection: -1,
                policy_name: "",
                years: 4,
                endTarget: 0,
                totalToBeNeutralized: 0, // data.this_year.emission + endTarget
                this_year:{
                }
            }
        }
    }


  componentDidMount() {

    // console.log("repeats ?")
    let step = this.state.setupStep;
    this.steps[step].current.style.display = "flex";
    calculateEmissionTargets(this)

    // monday.api(`query { me { name } }`).then((res) => {
    //   this.setState({ name: res.data.me.name });
    //   console.log(res.data.me.name)
    // });
  }


  render() {
    let step = this.state.setupStep;

    // console.log("repeatessss?")
    
    return <div className="App" style={{ display: "flex", flexDirection: "column" }}>

            <Flex direction={Flex.directions.COLUMN}>
                <Heading type={Heading.types.h1} value="Welcome to Carbon Tracker" />
                <p>Set up your carbon policy by following our pre-built schema or by customizing for your own needs.</p>
                
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
                
                {/* STEP 0 */}
                <Flex ref={this.step0} style={{display: "none"}} justify={Flex.justify.SPACE_AROUND}>
                    <SetupStep0 />
                </Flex>

                {/* STEP 1 */}
                <Flex ref={this.step1} style={{display: "none"}}
                    direction={Flex.directions.COLUMN} justify={Flex.justify.SPACE_AROUND}>
                    2
                </Flex>

                {/* STEP 2 */}
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
            
        </div>
    }
}

export default App;
