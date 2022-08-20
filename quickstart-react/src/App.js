import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import { Heading, LinearProgressBar, Tooltip } from "monday-ui-react-core"

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

  render() {

    let text = "Let's start building your amazing app, which will change the world! " + this.state.name

    let data = {
      this_year: {
        emission: 20,
        emission_target: 50,
        neutralization: 5,
        neutralization_target: 10,
        net_target: 15
      },
      year_2023: {
        emission_target: 40,
        neutralization_target: 20,
        net_target: 20
      },
      year_2024: {
        emission_target: 20,
        neutralization_target: 20,
        net_target: 0
      }
    }

    let emission_rate = data.this_year.emission / data.this_year.emission_target * 100;
    let neutralization_rate = data.this_year.neutralization / data.this_year.neutralization_target * 100;
    let net_target_rate = data.this_year.neutralization / data.this_year.net_target * 100;
    let month = 8;
    let OnTrackProgress = month / 12 * 100;

    return <div className="App" style={{
      display: "flex",
      flexDirection: "column"
    }}>
     

     <Heading type={Heading.types.h2} value="Carbon Policy Overview" size="small" />
    <p>Being carbon neutral until <b>2025</b></p>

    <Heading type={Heading.types.h3} value="Net Carbon Status" size="small" />
    <p><b>{data.this_year.emission - data.this_year.neutralization}</b> kg-CO2 (net) produced. This is <b>{ Math.round(net_target_rate) }%</b> of the net carbon emission for this year. </p>



    <Heading type={Heading.types.h3} value="Carbon Emissions" size="small" />
    <div className="linear-progress-bar_column fwidth">
        <div className="linear-progress-bar_block">
          <LinearProgressBar className="linear-progress-bar_small-wrapper" indicateProgress value={emission_rate} valueSecondary={OnTrackProgress} size={LinearProgressBar.sizes.LARGE} />
          {data.this_year.emission} kg-CO2 emission
        </div>  
      </div>

      <Heading type={Heading.types.h3} value="Neutralized Carbon Emissions" size="small" />
    <div className="linear-progress-bar_column fwidth">
        <div className="linear-progress-bar_block">
          <LinearProgressBar className="linear-progress-bar_small-wrapper" indicateProgress value={neutralization_rate} valueSecondary={OnTrackProgress} size={LinearProgressBar.sizes.LARGE} />
          {data.this_year.emission} kg-CO2 emission saved
        </div>  
      </div>





    </div>;
  }
}

export default App;
