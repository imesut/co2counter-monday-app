import React from "react";
// import { PureComponent } from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';


export default class TargetGraph extends React.Component {

    render(){

        // TODO: n-1 problem
        let targets = this.props.targets ? this.props.targets : [];
       
        console.log(targets);

        return(
            <ResponsiveContainer width={400} height={300}>
                <LineChart width={400} height={200} data={targets} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="5 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ReferenceLine y={0} stroke="black" />
                    <ReferenceLine stroke="green" strokeDasharray="3 3" segment={[{ x: '1', y: 100000 }, { x: '3', y: 0 }]} />
                    <ReferenceDot x="Year 1" y={90000} r={5} fill="red" />
                    <Line type="natural" strokeWidth={4} dataKey="target" stroke="#0073ea" />
                </LineChart>
            </ResponsiveContainer>
         );
    }   
}
