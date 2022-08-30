import React from "react";
import { Flex, Dropdown, TextField, Heading, Button } from "monday-ui-react-core"
import { Calendar } from "monday-ui-react-core/dist/icons"

import { carbonNeutralizationStrategies } from "../Data/StaticLists";

import YearBreakdowns from "../Components/YearBreakdowns"
import { calculateEmissionTargets, eoyEmissionForecast } from "../Models/Calculators";
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

        let baseContext = this.props.baseContext
        let data = baseContext.data


        return (

            <Flex direction={Flex.directions.COLUMN} style={{ width: 400 }}>

                <Heading type={Heading.types.h1} value="We promise to," size="medium" brandFont />
                <div className="rowItemSpacer" style={{ minWidth: '300px' }}>
                    <Dropdown className="whiteBg"
                        onChange={(e) => {
                            data.policy.policy_selection = e.value;
                            data.policy.policy_name = e.label;
                            calculateEmissionTargets(baseContext);
                            // Trigger a refresh
                            baseContext.setState({ setupStep: baseContext.state.setupStep });
                        }}
                        options={carbonNeutralizationStrategies}
                        placeholder={carbonNeutralizationStrategies[0].label}
                    // defaultValue={ carbonNeutralizationStrategies[0] }
                    />
                </div>

                <div className="whiteBg" style={{ display: (data.policy.policy_selection > 0 ? 'flex' : 'none') }}>
                    <TextField className="rowItemSpacer whiteBg" type={"number"} value={data.policy.endTarget} size={TextField.sizes.MEDIUM}
                        onChange={(value) => {
                            data.policy.endTarget = value;
                            calculateEmissionTargets(baseContext);
                        }
                        } />
                    <p className="rowItemSpacer noWrap">kg-CO2</p>
                </div>

                {/* Years defined here. */}
                <Flex direction={Flex.directions.ROW}>
                    <p className="rowItemSpacer">in</p>
                    <div className="whiteBg">

                        {/* TODO: Don't allow <1 values */}

                        <TextField className="rowItemSpacer whiteBg" type={"number"} value={data.policy.years} iconName={Calendar} size={TextField.sizes.MEDIUM}
                            onChange={(value) => {
                                data.policy.years = value;
                                calculateEmissionTargets(baseContext);
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
                    baseContext={baseContext} />

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