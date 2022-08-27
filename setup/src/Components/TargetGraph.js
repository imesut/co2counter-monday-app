import React from "react";
// import { PureComponent } from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, ReferenceDot, Area } from 'recharts';


export default class TargetGraph extends React.Component {

    render(){

        // TODO: n-1 problem
        let targets = this.props.targets ? this.props.targets : [];
       
        return(
            <ResponsiveContainer width={this.props.width ? this.props.width : 400} height={this.props.height ? this.props.height : 300}>
                <LineChart width={this.props.width ? this.props.width - 100 : 300} height={200} data={targets} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="5 3" />
                    <XAxis dataKey="year"/>
                    <YAxis label={{ value: "kg-CO2", angle: -90, position: "insideLeft" }} width={80} domain={ [ dataMin => Math.min(0, dataMin), dataMax => Math.max(dataMax, this.props.current) * 110/100 ] } />
                    <ReferenceLine y={0} stroke="black" />
                    {/* <ReferenceLine stroke="green" strokeDasharray="3 3" segment={[{ x: '1', y: 100000 }, { x: '3', y: 0 }]} /> */}
                    <ReferenceDot x={1} y={this.props.current} r={6} fill="black" />
                    <Line type="linear" strokeWidth={4} dataKey="target" stroke="#0073ea" />
                    <Area dataKey="Emission" stroke="#8884d8" fill="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
         );
    }   
}
