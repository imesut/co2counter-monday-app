import React, { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';


export default class TargetGraph extends React.Component {

    render(){

        let targets = this.props.targets ? this.props.targets : [];

        const data = [
            {
            name: 'Year 1',
            pv: 105000,
            },
            {
            name: 'Year 2',
            pv: 80000,
            },
            {
            name: 'Year 3',
            pv: 40000,
            },
            {
            name: 'Year 4',
            pv: 5000,
            },
            {
            name: 'Year 5',
            pv: -3500,
            }
        ];
       
        return(
            <ResponsiveContainer width={400} height={300}>
                <LineChart width={400} height={200} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="5 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ReferenceLine y={0} stroke="black" />
                <ReferenceLine stroke="green" strokeDasharray="3 3" segment={[{ x: 'Year 1', y: 100000 }, { x: 'Year 4', y: 0 }]} />
                <ReferenceDot x="Year 1" y={90000} r={5} fill="red" />
                <Line type="natural" strokeWidth={3}
                dataKey="pv" stroke="#0073ea" />
                </LineChart>
            </ResponsiveContainer>
         );
    }   
}
