import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import { Heading, LinearProgressBar } from "monday-ui-react-core"

const monday = mondaySdk();

class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      settings: {},
      name: "",
    };
  }

  componentDidMount() {
    // TODO: set up event listeners

    // monday.api(`query { me { name } }`).then((res) => {
    //   this.setState({ name: res.data.me.name });
    //   console.log(res.data.me.name)
    // });

  }

  steps = [{
    key: "FULFILLED",
    status: MultiStepIndicator.stepStatuses.FULFILLED,
    titleText: "Step 1",
    subtitleText: "Learn how to use monday CRM"
  }, {
    key: "PENDING",
    status: MultiStepIndicator.stepStatuses.PENDING,
    titleText: "Step 2",
    subtitleText: "Integrate your email"
  }, {
    key: "PENDING-3",
    status: MultiStepIndicator.stepStatuses.PENDING,
    titleText: "Step 3",
    subtitleText: "Import your data"
  }];


  render() {
   
    return <div className="App" style={{
      display: "flex",
      flexDirection: "column"
    }}>
     

     <Heading type={Heading.types.h2} value="Hello World" size="small" />
     <MultiStepIndicator className="monday-storybook-multiStepIndicator_big-size" steps={steps} textPlacement={MultiStepIndicator.textPlacements.VERTICAL} />;


  
    </div>;
  }
}

export default App;
