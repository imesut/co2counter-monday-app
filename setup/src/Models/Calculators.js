
export function calculateEmissionTargets(context){
    console.log("calculate emissions called.")
    let policy = context.data.policy.policy_selection
    let data = context.data;
    let operation = (policy === 1) ? 1 : ( policy === 0 ? 0 : -1); // Minus if the policy is to reach a level. 
    let totalToBeNeutralized = (data.this_year.emission*1 + data.policy.endTarget * operation);

    // Update global objects
    context.data.policy.totalToBeNeutralized = totalToBeNeutralized;
    context.setState({ setupStep: context.state.setupStep })
}


export function calculateAnnualTargets(context, years, currentEmission, totalToBeNeutralized){
        
        let perYearValue = totalToBeNeutralized / years;
        let breakdowns = [];
        // console.log(totalToBeNeutralized, perYearValue, currentEmission)
        // console.log(this.props)
        // console.log("Year breakdowns called for " + years + " years.")
        
        for (let y = 0; y < years; y++) {
            breakdowns.push({
                year: y+1,
                target: currentEmission - perYearValue * (y + 1)
            })
        }

        context.data.policy.breakdown = breakdowns;
}
