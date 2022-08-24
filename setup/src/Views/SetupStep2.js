import React from "react";
import { Flex, Dropdown, TextField } from "monday-ui-react-core"
import { Calendar } from "monday-ui-react-core/dist/icons"

import SplitedDivider from "../Components/SplitedDivider"
import {carbonNeutralizationStrategies} from "../Data/StaticLists";

import YearBreakdowns from "./../Components/YearBreakdowns"
import {calculateEmissionTargets, calculateAnnualTargets, eoyEmissionForecast} from "../Models/Calculators";
import TargetGraph from "../Components/TargetGraph";

export default class SetupStep2 extends React.Component {

    render(){

        let context = this.props.context ? this.props.context : {};
        let data = context.data;

        return(
            <>
                <p>Your current emission is: <b>{data.this_year.emission.toLocaleString("en-US")}</b> kg-CO2.</p>
                <p>Untill the end of the year, you might have: <b>{eoyEmissionForecast(data.this_year.emission).toLocaleString("en-US")}</b> kg-CO2, assuming you'll progress same.</p>
                <SplitedDivider text="↓" />
                <p>We want to,</p>
                <Flex direction={Flex.directions.ROW}>
                    <div className="rowItemSpacer" style={{ minWidth: '300px' }}>
                        <Dropdown
                            // ref={context.policySelectorRef}
                            onChange={(e) => {
                                data.policy.policy_selection = e.value;
                                data.policy.policy_name = e.label;
                                calculateEmissionTargets(context);
                                // Trigger a refresh
                                context.setState({setupStep: context.state.setupStep});
                            }}
                            options={ carbonNeutralizationStrategies }
                            placeholder={ carbonNeutralizationStrategies[0].label }
                            // defaultValue={ carbonNeutralizationStrategies[0] }
                        />
                    </div>

                    <div className="whiteBg" style={{ display: (data.policy.policy_selection > 0 ? 'flex' : 'none') }}>
                        <TextField className="rowItemSpacer whiteBg" type={"number"} value={0} size={TextField.sizes.MEDIUM}
                            onChange={(value) => {
                                    data.policy.endTarget = value;
                                    calculateEmissionTargets(context);
                                }
                                } />
                        {/* <p className="rowItemSpacer noWrap">kg-CO2</p> */}
                    </div>  
                    <p className="rowItemSpacer">,</p>
                </Flex>

                {/* Years defined here. */}
                <Flex direction={Flex.directions.ROW}>
                    <p className="rowItemSpacer">in</p>
                    <div className="whiteBg">

                        {/* TODO: Don't allow <1 values */}

                        <TextField className="rowItemSpacer whiteBg" type={"number"} value={4} iconName={Calendar} size={TextField.sizes.MEDIUM}
                            onChange={(value) => {
                                data.policy.years = value;
                                calculateEmissionTargets(context);
                                }
                            }
                        />
                    </div>
                    <p className="rowItemSpacer">years.</p>
                </Flex>

                <SplitedDivider text="So, We commit;"/>

                {/* <Flex direction={Flex.directions.ROW} justify={Flex.justify.START} > */}

                    <YearBreakdowns
                        totalToBeNeutralized={ data.policy.totalToBeNeutralized }
                        years={ data.policy.years }
                        eoyEmission={ eoyEmissionForecast(data.this_year.emission) }
                        context={ context } />

                    <TargetGraph targets={context.data.policy.breakdown}></TargetGraph>

                {/* </Flex> */}
            </>
        )
    }
}