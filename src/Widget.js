import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import "./App.css";
// import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"


// const monday = mondaySdk();

class Widget extends React.Component {
    constructor(props) {
        super(props);
        let baseContext = props.context;
    }

    componentDidMount() {
        // monday.api(`query { me { name } }`).then((res) => {
        //   this.setState({ name: res.data.me.name });
        //   console.log(res.data.me.name)
        // });
    }

    render() {
        return <div className="App" style={{ display: "flex", flexDirection: "column" }}>HW</div>
    }

}

export default Widget;