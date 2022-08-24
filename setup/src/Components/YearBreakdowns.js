import React from "react";

import { Flex, TextField } from "monday-ui-react-core"
import {calculateAnnualTargets} from "./../Models/Calculators"

export default class YearBreakdowns extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        console.log(this.props)
        
        calculateAnnualTargets(this.props.context, this.props.years, this.props.eoyEmission, this.props.totalToBeNeutralized);
    }

    render(){
        let context = this.props.context ? this.props.context : {};

        let viewItems = [];
        for (let y = 0; y < context.data.policy.breakdown.length; y++) {
            
            let item = context.data.policy.breakdown[y];
            viewItems.push(
                <Flex direction={Flex.directions.ROW}>
                    <p className="noWrap rowItemSpacer">Net Emission for Year {item.year}:</p>
                    <div className="whiteBg">
                        <TextField className="rowItemSpacer" type={"number"} value={ item.target } />
                    </div>
                </Flex>
            )
        }

       
        return( 
            <Flex direction={Flex.directions.COLUMN}>
                {viewItems} 
            </Flex>
            );
    }

}
