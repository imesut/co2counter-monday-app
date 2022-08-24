export function calculateEmissionTargets(context){

    console.log("calculate emissions called.")
    let policy = context.data.policy.policy_selection
    let data = context.data;
    let operation = (policy === 1) ? 1 : ( policy === 0 ? 0 : -1); // Minus if the policy is to reach a level. 
    let totalToBeNeutralized = ( eoyEmissionForecast(data.this_year.emission) + data.policy.endTarget * operation);
    console.log("totalToBeNeutralized", totalToBeNeutralized);

    // Update global objects
    context.data.policy.totalToBeNeutralized = totalToBeNeutralized;
    calculateAnnualTargets(context, context.data.policy.years, eoyEmissionForecast(context.data.this_year.emission), context.data.policy.totalToBeNeutralized)
    context.setState({ setupStep: context.state.setupStep })
}


export function calculateAnnualTargets(context, years, eoyEmission, totalToBeNeutralized){

    console.log("calculateAnnualTargets", totalToBeNeutralized, eoyEmission);
    let perYearValue = totalToBeNeutralized / years;
    let breakdowns = [];

    for (let y = 0; y < years; y++) {
        breakdowns.push({
            year: y+1,
            target: eoyEmission - perYearValue * (y + 1)
        })
    }

    context.data.policy.breakdown = breakdowns;
    console.log("breakdowns", breakdowns)
}

export function eoyEmissionForecast(emission, month){
    month = month ? month : (new Date()).getMonth() + 1;
    let endOfTheYearMultiplier = 12 / month;
    return emission * endOfTheYearMultiplier;
}
