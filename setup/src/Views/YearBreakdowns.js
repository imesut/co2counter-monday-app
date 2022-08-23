import React from "react";

import { Flex, TextField } from "monday-ui-react-core"



export default class YearBreakdowns extends React.Component {

    render(){

        let years = this.props.years ? this.props.years : 1;
        let items = [];
        let totalToBeNeutralized = this.props.totalToBeNeutralized ? this.props.totalToBeNeutralized : 0;
        let perYearValue = totalToBeNeutralized / years;

        for (let y = 0; y <= years; y++) {
            items.push(
                <Flex direction={Flex.directions.ROW}>
                    <p className="noWrap rowItemSpacer">Net Emission for Year {y + 1}:</p>
                    <div className="whiteBg">
                        <TextField className="rowItemSpacer" type={"number"} value={ perYearValue } />
                    </div>
                </Flex>
            )   
        }
       
        return( items );
    }
    
}