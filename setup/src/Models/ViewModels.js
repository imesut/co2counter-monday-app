
let changeStep = (context, commandOrCount) => {

    let newCount = context.state.setupStep;

    if(commandOrCount ===  "next"){
        newCount = context.state.setupStep + 1;
    } else if(commandOrCount === "back"){
        newCount = context.state.setupStep - 1;
    } else{
        newCount = commandOrCount;
    }

    for (let i = 0; i < 3; i++) {
        // console.log("iterating for" + i)
        context.steps[i].current.style.display = "none"
    }

    context.steps[newCount].current.style.display = "flex";
    context.setState({ setupStep: newCount })
}

export default changeStep;