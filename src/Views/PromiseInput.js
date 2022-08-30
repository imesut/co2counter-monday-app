import React, { useCallback, useState } from "react";
import { Flex, Dropdown, TextField, Heading, Button } from "monday-ui-react-core"
import { Calendar } from "monday-ui-react-core/dist/icons"

import { carbonNeutralizationStrategies } from "../Data/StaticLists";

import YearBreakdowns from "../Components/YearBreakdowns"
import { calculateEmissionTargets, calculateAnnualTargets, eoyEmissionForecast } from "../Models/Calculators";
import TargetGraph from "../Components/TargetGraph";
import YearOverviewGraph from "../Components/YearOverviewGraph"
import { setStrategyDataToMonday } from "../Models/MondayApiModel";
import { Check } from "monday-ui-react-core/dist/allIcons";



export default class PromiseInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            savedWithSuccess: false
        };
    }

    render() {

        let context = this.props.context ? this.props.context : {};
        let data = context.data;


        return (

            <Flex direction={Flex.directions.COLUMN} style={{ width: 400 }}>

                <Heading type={Heading.types.h1} value="We promise to," size="medium" brandFont />
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
                    <p className="rowItemSpacer">years,</p>
                </Flex>
                <p className="rowItemSpacer">that means, we'll</p>


                <YearBreakdowns
                    totalToBeNeutralized={data.policy.totalToBeNeutralized}
                    years={data.policy.years}
                    eoyEmission={eoyEmissionForecast(data.this_year.emission)}
                    context={context} />

                <Button success={this.state.savedWithSuccess} successIcon={Check} successText="Promise Saved"
                    onClick={(e) => {
                        // Local env:
                        // this.setState({ savedWithSuccess: true })
                        console.log("data to save", data)
                        setStrategyDataToMonday(data).then((isSuccess) => {
                            this.setState({ savedWithSuccess:  isSuccess})
                        })
                        
                    }
                    }>
                    Save Promises
                </Button >



            </Flex >
        )
    }
}