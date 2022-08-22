import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"

//Explore more Monday React Components here: https://style.monday.com/
import { Heading, MultiStepIndicator, Box, Flex, Dropdown, Divider, Button, Icon } from "monday-ui-react-core"
import { NavigationChevronLeft, NavigationChevronRight } from "monday-ui-react-core/dist/icons"


const monday = mondaySdk();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.step0 = React.createRef();
        this.step1 = React.createRef();
        this.step2 = React.createRef();
        this.nextButton = React.createRef();
        this.backButton = React.createRef();

        this.steps = [this.step0, this.step1, this.step2]

        this.state = {
            settings: {},
            setupStep: 1
        };
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

        if(newCount === 2){
            console.log("check")
            this.nextButton.current.disabled = true;
        } else{
            this.nextButton.current.disabled = false;
        }
        if(newCount == 0){
            this.backButton.current.disabled = true;
        } else {
            this.backButton.current.disabled = false;

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

        <Flex ref={this.step1} style={{display: "none"}} justify={Flex.justify.SPACE_AROUND}>
            2
        </Flex>

        <Flex ref={this.step2} style={{display: "none"}} justify={Flex.justify.SPACE_AROUND}>
            3
        </Flex>


    <div style={{bottom: 0, position: "fixed", width: "inherit", margin: 0}} >
        <Flex direction={Flex.directions.COLUMN}>
            <Flex direction={Flex.directions.ROW}>
                <Button ref={this.backButton} style={{margin: 8}} size={Button.sizes.SMALL} leftIcon={NavigationChevronLeft}
                    onClick={() => {this.changeStep("back")}}
                    disabled={(this.state.setupStep === 0 )}>
                    Back
                </Button>
                <Button ref={this.nextButton} style={{margin: 8}} size={Button.sizes.SMALL} rightIcon={NavigationChevronRight}
                    onClick={() => {this.changeStep("next")}}
                    disabled={(this.state.setupStep === 2 )}>
                    Next
                </Button>
            </Flex>
        </Flex>
    </div>
    </Box>

    </div>
  }
}

export default App;
