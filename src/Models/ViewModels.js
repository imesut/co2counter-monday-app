
let changeStep = (baseContext, commandOrCount) => {

    let newCount = baseContext.state.setupStep;

    if(commandOrCount ===  "next"){
        newCount = baseContext.state.setupStep + 1;
    } else if(commandOrCount === "back"){
        newCount = baseContext.state.setupStep - 1;
    } else{
        newCount = commandOrCount;
    }

    for (let i = 0; i < 3; i++) {
        // console.log("iterating for" + i)
        baseContext.steps[i].current.style.display = "none"
    }

    baseContext.steps[newCount].current.style.display = "flex";
    baseContext.setState({ setupStep: newCount })
}

export default changeStep;