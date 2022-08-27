import React from "react";

import { PieChart, Pie, ResponsiveContainer } from 'recharts';

export default class CategoryPieChart extends React.Component {

    render() {

        let width = this.props.width;
        let height = this.props.height;
        let categoryData = this.props.data;
        let total = categoryData.map(val => val["Emission"]).reduce((a,b)=>a+b)

        return (
            <ResponsiveContainer width={width ? width : "100%"} height={height ? height : 250}>
                <PieChart width={width ? width : 400} height={height ? height : 250}>
                    <Pie data={categoryData} dataKey="Emission" nameKey="category" cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#8884d8"
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                            console.log("handling label?");
                            const RADIAN = Math.PI / 180;
                            const radius = 25 + innerRadius + (outerRadius - innerRadius);
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                            return (
                                <text x={x} y={y} fill="#8884d8" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                                    {categoryData[index].category} {Math.round(value/total*100)}%
                                </text>
                            );
                        }
                        }
                    />
                </PieChart>
            </ResponsiveContainer>
        );
    }
}
