import React from "react";
import { Flex, Dropdown, TextField, Heading } from "monday-ui-react-core"
import { Calendar } from "monday-ui-react-core/dist/icons"

import SplitedDivider from "../Components/SplitedDivider"
import { carbonNeutralizationStrategies } from "../Data/StaticLists";

import YearBreakdowns from "../Components/YearBreakdowns"
import { calculateEmissionTargets, calculateAnnualTargets, eoyEmissionForecast } from "../Models/Calculators";
import TargetGraph from "../Components/TargetGraph";
import YearOverviewGraph from "../Components/YearOverviewGraph"

export default class PromiseInput extends React.Component {

    render() {

        let context = this.props.context ? this.props.context : {};
        let data = context.data;

        return (

            <Flex direction={Flex.directions.COLUMN} style={{ width: 400 }}>

                <Heading type={Heading.types.h2} value="Promises" size="medium" brandFont />
                <p className="subtext">Climate action is more than the targets, it's our common effort to make the world better.</p>

                <p>We promise to,</p>
                <div className="rowItemSpacer" style={{ minWidth: '300px' }}>
                    <Dropdown
                        // ref={context.policySelectorRef}
                        onChange={(e) => {
                            data.policy.policy_selection = e.value;
                            data.policy.policy_name = e.label;
                            calculateEmissionTargets(context);
                            // Trigger a refresh
                            context.setState({ setupStep: context.state.setupStep });
                        }}
                        options={carbonNeutralizationStrategies}
                        placeholder={carbonNeutralizationStrategies[0].label}
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
                    <p className="rowItemSpacer noWrap">kg-CO2</p>
                </div>

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

                <SplitedDivider text="So, We commit;" />

                {/* <Flex direction={Flex.directions.ROW} justify={Flex.justify.START} > */}

                <YearBreakdowns
                    totalToBeNeutralized={data.policy.totalToBeNeutralized}
                    years={data.policy.years}
                    eoyEmission={eoyEmissionForecast(data.this_year.emission)}
                    context={context} />

                {/* <TargetGraph targets={context.data.policy.breakdown} current={context.data.this_year.emission}></TargetGraph>

                    <YearOverviewGraph
                        currentEmission={context.data.this_year.emission}
                        currentNeutralized={context.data.this_year.neutralized}
                        limitEmission={eoyEmissionForecast(context.data.this_year.emission)}
                        netEmission={context.data.this_year.net}  /> */}


                {/* this_year: {
                        emission: 105000,
                        neutralized: 0,
                        net: 105000
                    } */}

                {/* </Flex> */}
            </Flex>
        )
    }
}