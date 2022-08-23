let calculateEmissionTargets = (context) => {
    // console.log("calculate emissions called.")
    let policy = context.data.policy.policy_selection
    let data = context.data;
    let operation = (policy === 1) ? 1 : ( policy === 0 ? 0 : -1); // Minus if the policy is to reach a level. 
    let totalToBeNeutralized = (data.this_year.emission*1 + data.policy.endTarget * operation);

    // Update global objects
    context.data.policy.totalToBeNeutralized = totalToBeNeutralized;
    context.setState({ setupStep: context.state.setupStep })
}

export default calculateEmissionTargets;