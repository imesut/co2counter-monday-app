import React from "react";
import { Flex, TextField, Tipseen, TipseenContent } from "monday-ui-react-core"
import { calculateAnnualTargets } from "./../Models/Calculators"

export default class YearBreakdowns extends React.Component {

    constructor(props) {
        super(props);

        this.tipseen = <div className="tipSeenInBox">
            <Tipseen position="right" isCloseButtonHidden={true} content={
                <TipseenContent isSubmitHidden={true} isDismissHidden={false} title="Feel Free to Set Your Pace"
                    onDismiss={(e) => {
                        console.log(e);
                        let context = this.props.context;
                        context.setState({ breakdownCustomizationTipDismissed: true });
                    }}>
                    Linear reduction is a simple method for clarity.
                    And, you can set custom year to year levels for your business.
                </TipseenContent>}>
                <div className="monday-style-story-tipseen_container" />
            </Tipseen>
        </div>
    }

    componentDidMount() {
        calculateAnnualTargets(this.props.context, this.props.years, this.props.eoyEmission, this.props.totalToBeNeutralized);
    }

    render() {
        let context = this.props.context ? this.props.context : {};
        let viewItems = [];
        let length = context.data.policy.breakdown.length
        for (let y = 0; y < length; y++) {

            let item = context.data.policy.breakdown[y];
            viewItems.push(
                <>
                    <Flex direction={Flex.directions.ROW}>
                        <p className="noWrap rowItemSpacer">Not exceed</p>
                        <div className="whiteBg">
                            <TextField className="rowItemSpacer" type={"number"} value={item.target} onChange={
                                (value) => {
                                    context.data.policy.breakdown[y].target = value;
                                    context.setState({ setupStep: context.state.setupStep });
                                }
                            } />

                            {/* Insert tipseen to the first input item */}
                            {(y === 0 & !context.state.breakdownCustomizationTipDismissed) ? this.tipseen : ""}
                            
                        </div>
                        <p className="noWrap rowItemSpacer">kg-CO2</p>
                    </Flex>
                    <p style={{ width: "100%", marginLeft: 24 }} className="rowItemSpacer">
                        net emission level, at the end of Year {item.year}{y === length - 1 ? "." : ","}
                    </p>
                </>

            )
        }

        return (
            <Flex direction={Flex.directions.COLUMN}>
                {viewItems}
            </Flex>
        );
    }

}
