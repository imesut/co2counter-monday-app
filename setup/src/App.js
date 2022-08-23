import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"

//Explore more Monday React Components here: https://style.monday.com/
import { Heading, MultiStepIndicator, Box, Flex, Dropdown, Divider, Button, Steps, TextField } from "monday-ui-react-core"
import { Calendar } from "monday-ui-react-core/dist/icons"


const monday = mondaySdk();

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
            setupStep: 1
        };

        this.month = 8;

        this.data = {
            this_year: {
                emission: 105000
            },
            policy: {
                policy_selection: -1,
                policy_name: "",
                this_year:{
                }
            }
        }
    }

    changeStep = (commandOrCount) => {
        let newCount = this.state.setupStep;

        if(commandOrCount ===  "next"){
            newCount = this.state.setupStep + 1;
        } else if(commandOrCount === "back"){
            newCount = this.state.setupStep - 1;
        } else{
            newCount = commandOrCount;
        }

        for (let i = 0; i < 3; i++) {
            console.log("iterating for" + i)
            this.steps[i].current.style.display = "none"
        }

        this.steps[newCount].current.style.display = "flex";
        this.setState({ setupStep: newCount })
    }
    

  componentDidMount() {

    console.log("repeats ?")

    let step = this.state.setupStep;
    this.steps[step].current.style.display = "flex";

    // TODO: set up event listeners

    // monday.api(`query { me { name } }`).then((res) => {
    //   this.setState({ name: res.data.me.name });
    //   console.log(res.data.me.name)
    // });

  }


  render() {

    // Abbreviation
    let step = this.state.setupStep;

    console.log("repeatessss?")

    let steps = [{
      key: "STEP1",
      status: step > 0 ? MultiStepIndicator.stepStatuses.FULFILLED : MultiStepIndicator.stepStatuses.ACTIVE,
      titleText: "1 - Expenses",
      subtitleText: ""
    }, {
      key: "STEP2",
      status: step > 1 ? MultiStepIndicator.stepStatuses.FULFILLED : (step === 1 ? MultiStepIndicator.stepStatuses.ACTIVE : MultiStepIndicator.stepStatuses.PENDING),
      titleText: "2 - Carbon Neutralization",
      subtitleText: ""
    }, {
      key: "STEP3",
      status: step === 2 ? MultiStepIndicator.stepStatuses.ACTIVE : MultiStepIndicator.stepStatuses.PENDING,
      titleText: "3 - Approve",
      subtitleText: ""
    }];


    let tablesForExpenseRecords = [
      {
        label: 'Option 1',
        value: 1
      },
      {
        label: 'Option 2',
        value: 2
      },
      {
        label: 'Option 3',
        value: 3
      }
    ];

    
    return <div className="App" style={{
                display: "flex",
                flexDirection: "column"
            }}>
     
    <Flex direction={Flex.directions.COLUMN}>
        <Heading type={Heading.types.h1} value="Welcome to Carbon Tracker" />
        <p>Set up your carbon policy by following our pre-built schema or by customizing for your own needs.</p>
        <MultiStepIndicator className="monday-storybook-multiStepIndicator_big-size"
            steps={steps}
            textPlacement={MultiStepIndicator.textPlacements.VERTICAL}
            onClick={ (step) => {this.changeStep(step - 1)} } />
    </Flex>
    <Box className="boxWrapper" shadow={Box.shadows.MEDIUM} border={Box.borders.DEFAULT} rounded={Box.roundeds.MEDIUM} backgroundColor={Box.backgroundColors.GREY_BACKGROUND_COLOR}>
        
        <Flex ref={this.step0} style={{display: "none"}} justify={Flex.justify.SPACE_AROUND}>
        <Flex justify={Flex.justify.START} direction={Flex.directions.COLUMN}>
                <Heading type={Heading.types.h2} size="small" value="Create Prebuilt Schema" />
                <Button onClick={function noRefCheck(){}}>
                Create
                </Button>
                
            <div style={{ width: '600px' }}>
                <Flex>
                <Divider /><span style={{padding: 20, width: 300}}>or Customize</span><Divider />
                </Flex>
            </div>

                <Heading type={Heading.types.h3} size="small" value="First, Choose Expense" />
                <p>Choose a Table which contains your expense records.</p>
                <Dropdown
                    className="dropdown-stories-styles_spacing carbon-dropdown"
                    onChange={function noRefCheck(){}}
                    onClear={function noRefCheck(){}}
                    onInputChange={function noRefCheck(){}}
                    onOptionRemove={function noRefCheck(){}}
                    onOptionSelect={function noRefCheck(){}}
                    options={tablesForExpenseRecords}
                    placeholder="Placeholder text here"
                />

                <Heading type={Heading.types.h3} size="small" value="Then, Pick your Carbon Calculator" />
                <p>Choose a Table to calculate your expenses' carbon footprint.</p>
                <Dropdown
                    className="dropdown-stories-styles_spacing carbon-dropdown"
                    onChange={function noRefCheck(){}}
                    onClear={function noRefCheck(){}}
                    onInputChange={function noRefCheck(){}}
                    onOptionRemove={function noRefCheck(){}}
                    onOptionSelect={function noRefCheck(){}}
                    options={tablesForExpenseRecords}
                    placeholder="Placeholder text here"
                />
            </Flex>
        </Flex>

        <Flex ref={this.step1} style={{display: "none"}} direction={Flex.directions.COLUMN} justify={Flex.justify.SPACE_AROUND}>
            
            <p>Your current emission is, <b>{this.data.this_year.emission.toLocaleString("en-US")}</b> kg-CO2.</p>
            <Divider></Divider>
            <p>We want to,</p>

            <Flex direction={Flex.directions.ROW}>
                <div style={{ width: '500px' }}>
                <Dropdown
                    ref={this.policySelectorRef}
                    defaultValue={[{ label: "⚖️ be Carbon Neutral", value: 0 }]}
                    options={[
                    {
                        label: "⚖️ be Carbon Neutral",
                        value: 0
                    },
                    {
                        label: "↘️ Reduce our emission to:",
                        value: 1
                    },
                    {
                        label: "✅ Carbon Positive with:",
                        value: 2
                    }
                    ]}
                    placeholder="⚖️ be Carbon Neutral"
                />

        </div>
        {/* <TextField style={{display: this.policySelectorRef.current.value > 0 ? "flex" : "none"}} type={"number"} value={4} iconName={Calendar} size={TextField.sizes.MEDIUM} /> */}

        <p style={{margin: 12}}>in</p>
        <TextField type={"number"} value={4} iconName={Calendar} size={TextField.sizes.MEDIUM} />
        <p style={{margin: 12}}>years</p>

        </Flex>



        </Flex>

        <Flex ref={this.step2} style={{display: "none"}} justify={Flex.justify.SPACE_AROUND}>
            3
        </Flex>    
    </Box>

    <div style={{width: "inherit"}} >
        <Flex direction={Flex.directions.COLUMN}>
            <Steps steps={[<div />,<div />,<div />]} activeStepIndex={step} onChangeActiveStep={ (e, s) => {this.changeStep(s)} }/>
        </Flex>
    </div>

    </div>
  }
}

export default App;
