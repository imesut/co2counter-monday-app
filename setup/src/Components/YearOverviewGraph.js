import React from "react";
// import { PureComponent } from "react";

import { BarChart, Bar, XAxis, YAxis, ReferenceLine, LabelList, Cell } from 'recharts';


export default class YearOverviewGraph extends React.Component {

    render(){

        // TODO: n-1 problem
        let targets = this.props.targets ? this.props.targets : [];

        let colors = ["#8884d8", "#000000", "#ababab"]
        let data = [
            { name: 'Emissions', value: 105000, range: [0, 105000] },
            { name: 'Recovered', value: 55000, range: [50000, 105000] },
            { name: 'Net Emissions', value: 50000, range: [0, 50000] }
        ]

        console.log(data[1].color);
        
       let limit = 157000 * 1.05;

        return(
            <>
                <BarChart layout="vertical" width={400} height={150} data={data} barCategoryGap={-1}>
                    
                    <YAxis type="category" dataKey="name" width={100}/>
                    <XAxis type="number" domain={ [ "dataMin", dataMax => Math.max(dataMax, 157500) * 1.05 ] }
                        tickFormatter={(tick) => {
                            return `${Math.round(tick/limit*100)}%`;
                            }}/>
                    <ReferenceLine x={157500}></ReferenceLine>
                    <Bar dataKey="range" fill="#8884d8">
                        <LabelList dataKey="value" position="right" />
                    </Bar>


                </BarChart>

            </>
         );
    }   
}
