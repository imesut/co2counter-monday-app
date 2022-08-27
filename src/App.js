import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
// import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
import Setup from "./Setup"
import Widget from "./Widget";

// const monday = mondaySdk();

class App extends React.Component {
    constructor(props) {
        super(props);

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
        // monday.api(`query { me { name } }`).then((res) => {
        //   this.setState({ name: res.data.me.name });
        //   console.log(res.data.me.name)
        // });
    }


    render() {
        // let step = this.state.setupStep;

        // console.log("repeatessss?")

        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Setup baseContext={this} />} />
                    <Route path="widget" element={<Widget />} />
                </Routes>
            </BrowserRouter>

        )
    }
}

export default App;
