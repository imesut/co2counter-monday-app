import React from "react";

import { Flex, TextField } from "monday-ui-react-core"
import {calculateAnnualTargets} from "./../Models/Calculators"

export default class YearBreakdowns extends React.Component {

    render(){

        let context = this.props.context ? this.props.context : {};
        let years = this.props.years ? this.props.years : 1;
        let currentEmission = this.props.currentEmission ? this.props.currentEmission : 0;
        let totalToBeNeutralized = this.props.totalToBeNeutralized ? this.props.totalToBeNeutralized : 0;

        calculateAnnualTargets(context, years, currentEmission, totalToBeNeutralized);
        
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


       
        return( viewItems );
    }

}
