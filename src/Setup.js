import React from "react";
import "./App.css";
// import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
import { Box, Flex, Button, Link } from "monday-ui-react-core"
import { Retry } from "monday-ui-react-core/dist/allIcons";
import { eoyEmissionForecast } from "./Models/Calculators";
import emissionIcon from './img/emission.png';
import targetIcon from './img/target.png';
import actionIcon from './img/action.png';
import { XAxis, YAxis, BarChart, Bar, Legend } from 'recharts';


// Views - Steps
import PromiseInput from "./Views/PromiseInput";

//Models
import { calculateEmissionTargets } from "./Models/Calculators";
import TargetGraph from "./Components/TargetGraph";
import YearOverviewGraph from "./Components/YearOverviewGraph";
import CategoryPieChart from "./Components/CategoryPieChart";
import GraphBoxWrapper from "./Components/GraphBoxWrapper";
import SectionTitle from "./Components/SectionTitle";
import ActionBox from "./Components/ActionBox";
import { contentColors } from "./Data/contentColors";
import { AddSmall } from "monday-ui-react-core/dist/icons";
import { initFromMonday } from "./Models/MondayAdaptor";


// const monday = mondaySdk();

class Setup extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        calculateEmissionTargets(this.props.baseContext)

        // monday.api(`query { me { name } }`).then((res) => {
        //   baseContext.setState({ name: res.data.me.name });
        //   console.log(res.data.me.name)
        // });
    }


    render() {

        let baseContext = this.props.baseContext;

        let emissionDistribution = baseContext.data.this_year.emissionDistribution;
        let emissionTotal = baseContext.data.this_year.emission;

        let timestamp = baseContext.state.lastUpdatedTimestamp
        let dateDisplayOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
        let date = new Date(timestamp);
        let dateToDisplay = date.toLocaleDateString("en-GB", dateDisplayOptions)
        let asMinutes = Math.round((Date.now() - timestamp) / 1000 / 60)
        // console.log(emissionDistribution)


        return <div className="App" style={{ display: "flex", flexDirection: "column" }}>

            <Flex direction={Flex.directions.ROW} justify={Flex.justify.END} >
                <p className="subtext" style={{ margin: 0, padding: 0, marginRight: 12, fontSize: "0.75rem", lineHeight: "12px", textAlign: "right" }}>
                    Last Update: {dateToDisplay}<br></br>{asMinutes + " minutes ago"}
                </p>
                <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Retry} onClick={
                    initFromMonday(baseContext, true)
                }></Button>
            </Flex>

            <Flex direction={Flex.directions.ROW} justify={Flex.justify.SPACE_BETWEEN} align={Flex.align.START}>


                {/* COL 1 */}
                <Flex direction={Flex.directions.COLUMN} style={{ maxWidth: "33vw" }}>

                    <SectionTitle icon={emissionIcon} title="Overview" />

                    <GraphBoxWrapper width={350} height={250} heading="Emission Breakdown">
                        <CategoryPieChart width="100%" height={250} data={emissionDistribution} />
                    </GraphBoxWrapper>

                    <div style={{ width: "100%", maxWidth: "30vw", textAlign: "center" }}>
                        <Box padding={Box.paddings.SMALL} rounded={Box.roundeds.MEDIUM} border={Box.borders.DEFAULT}>

                            <p>Your Current: {Number((emissionTotal / 1000).toFixed(2))} → {Number((eoyEmissionForecast(emissionTotal) / 1000).toFixed(2))} tonnes Emission</p>
                            <p>Till end of the year: your pace will result in {Number((eoyEmissionForecast(emissionTotal) / 1000).toFixed(2))} tonnes.</p>
                            <p className="subtext">{Number((eoyEmissionForecast(emissionTotal) / 1000).toFixed(2))} tonnes causes to melt <b>{Number((eoyEmissionForecast(emissionTotal) / 1000 * 3).toFixed(2))} m3</b> arctic ice. <a href="https://www.airclim.org/acidnews/1-tonne-co2-melts-3-m2-arctic-ice">🔗</a></p>
                        </Box>
                    </div>

                    <GraphBoxWrapper width={350} height={25 + emissionDistribution.length * 30} heading="Emissions and Possible Savings">
                        <BarChart layout="vertical" barCategoryGap={0} data={emissionDistribution}>
                            <YAxis width={100} type="category" dataKey="category" />
                            <XAxis type="number" hide={true} />
                            <Bar dataKey="Emission" stackId="a" fill={contentColors["brand-blue"]} />
                            <Bar dataKey="Potential Reduction" stackId="a" fill={contentColors.dark_blue} />
                            <Legend />
                        </BarChart>
                    </GraphBoxWrapper>

                </Flex>

                {/* COL 2 */}

                <Flex direction={Flex.directions.COLUMN} style={{ maxWidth: "33vw" }}>

                    <SectionTitle icon={targetIcon} title="Set Targets" />

                    <GraphBoxWrapper width={350} height={300} heading="Carbon Zero Roadmap">
                        <TargetGraph targets={baseContext.data.policy.breakdown} current={baseContext.data.this_year.emission}></TargetGraph>
                    </GraphBoxWrapper>

                    <PromiseInput context={baseContext} data={baseContext.data} />

                </Flex>

                {/* COL3 */}
                <Flex direction={Flex.directions.COLUMN} style={{ maxWidth: "33vw" }}>
                    <SectionTitle icon={actionIcon} title="Take Action" />

                    <GraphBoxWrapper width={300} height={150} heading="Year Status">
                        <YearOverviewGraph
                            currentEmission={baseContext.data.this_year.emission}
                            currentNeutralized={baseContext.data.this_year.neutralized}
                            limitEmission={baseContext.data.policy.breakdown[0].target}
                            netEmission={baseContext.data.this_year.net}
                        />
                    </GraphBoxWrapper>

                    <div className="actionBoxesContainer" >

                        <ActionBox heading="Avoid" actionName="Find Something to Avoid"
                            description="Where appropriate, avoid and cut the emission sources."
                            url={baseContext.state.expenseTableHref} />

                        <ActionBox heading="Reduce" actionName="Overview to Reduce"
                            description="If you cannot avoid it, how you can decrease your consumption, to reduce the emissions?"
                            url={baseContext.state.expenseTableHref} />

                        <ActionBox heading="Offset" actionName="Add an Offset Record" icon={AddSmall}
                            description="When you cannot avoid or reduce, you can contribute to carbon negative projects worldwide, to make an impact in total."
                            url={baseContext.state.offsetFormHref} />

                    </div>



                </Flex>

            </Flex>

            <Button style={{ width: 120 }} kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL}>Something weird?</Button>
            <p className="subtext">Check out our guide to calculate your emissions better.</p>

        </div>
    }
}

export default Setup;
