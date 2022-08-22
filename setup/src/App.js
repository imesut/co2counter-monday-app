import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"

//Explore more Monday React Components here: https://style.monday.com/
import { Heading, MultiStepIndicator, Box, Flex, Dropdown, Divider, Button, Icon } from "monday-ui-react-core"
import { NavigationChevronRight, NavigationChevronLeft } from "monday-ui-react-core/dist/icons"


const monday = mondaySdk();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        settings: {},
        name: "",
        setupStep: 0
        };
    }

    changeStep = (command) => {
        console.log("command" + command)
        if(command ===  "next"){
            this.setState({ setupStep: this.state.setupStep + 1 })
        }
        else if(command === "back"){
            this.setState({ setupStep: this.state.setupStep - 1 })
        }
        console.log(this.state.setupStep)
    }

  componentDidMount() {
    // TODO: set up event listeners

    // monday.api(`query { me { name } }`).then((res) => {
    //   this.setState({ name: res.data.me.name });
    //   console.log(res.data.me.name)
    // });

  }


  render() {

    let steps = [{
      key: "STEP1",
      status: MultiStepIndicator.stepStatuses.ACTIVE,
      titleText: "1 - Expenses",
      subtitleText: ""
    }, {
      key: "STEP2",
      status: MultiStepIndicator.stepStatuses.PENDING,
      titleText: "2 - Carbon Neutralization",
      subtitleText: ""
    }, {
      key: "STEP3",
      status: MultiStepIndicator.stepStatuses.PENDING,
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
        <MultiStepIndicator className="monday-storybook-multiStepIndicator_big-size" steps={steps} textPlacement={MultiStepIndicator.textPlacements.VERTICAL} />
    </Flex>
      <Box className="boxWrapper" shadow={Box.shadows.MEDIUM} border={Box.borders.DEFAULT} rounded={Box.roundeds.MEDIUM} backgroundColor={Box.backgroundColors.GREY_BACKGROUND_COLOR}>
        
      <Flex justify={Flex.justify.SPACE_AROUND}>

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

    <div style={{bottom: 6, position: "absolute", width: "inherit", backgroundColor: "#f6f7fb", borderRadius: 8}} >
        <Flex direction={Flex.directions.COLUMN}>
            <Divider />
            <Button style={{margin: 8}} size={Button.sizes.SMALL} disabled={false} rightIcon={NavigationChevronRight}
                onClick={() => {this.changeStep("next")}} >
                Next
            </Button>
        </Flex>
    </div>
    </Box>


    </div>
  }
}

export default App;
