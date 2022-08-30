export function calculateEmissionTargets(baseContext){

    console.log("calculate emissions called.")
    let policy = baseContext.data.policy.policy_selection
    let data = baseContext.data;
    let operation = (policy === 1) ? 1 : ( policy === 0 ? 0 : -1); // Minus if the policy is to reach a level. 
    let totalToBeNeutralized = ( eoyEmissionForecast(data.this_year.emission) + data.policy.endTarget * operation);
    console.log("totalToBeNeutralized", totalToBeNeutralized);

    // Update global objects
    baseContext.data.policy.totalToBeNeutralized = totalToBeNeutralized;
    calculateAnnualTargets(baseContext, baseContext.data.policy.years, eoyEmissionForecast(baseContext.data.this_year.emission), baseContext.data.policy.totalToBeNeutralized)
    baseContext.setState({ setupStep: baseContext.state.setupStep })
}


export function calculateAnnualTargets(baseContext, years, eoyEmission, totalToBeNeutralized){

    console.log("calculateAnnualTargets", totalToBeNeutralized, eoyEmission);
    let perYearValue = totalToBeNeutralized / years;
    let breakdowns = [];

    for (let y = 0; y < years; y++) {
        breakdowns.push({
            year: y+1,
            target: Math.round(eoyEmission - perYearValue * (y + 1))
        })
    }

    baseContext.data.policy.breakdown = breakdowns;
    console.log("breakdowns", breakdowns)
}

export function eoyEmissionForecast(emission, month){
    month = month ? month : (new Date()).getMonth() + 1;
    let endOfTheYearMultiplier = 12 / month;
    return emission * endOfTheYearMultiplier;
}
