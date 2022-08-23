import { MultiStepIndicator } from "monday-ui-react-core"


let SetupSteps = (step) => { return(
        [{
            key: "STEP1",
            status: step > 0 ? MultiStepIndicator.stepStatuses.FULFILLED : MultiStepIndicator.stepStatuses.ACTIVE,
            titleText: "1 - Expenses",
            subtitleText: ""
        }, {
            key: "STEP2",
            status: step > 1 ? MultiStepIndicator.stepStatuses.FULFILLED : (step === 1 ? MultiStepIndicator.stepStatuses.ACTIVE : MultiStepIndicator.stepStatuses.PENDING),
            titleText: "2 - Carbon Neutralization",
            subtitleText: ""
        }, {
            key: "STEP3",
            status: step === 2 ? MultiStepIndicator.stepStatuses.ACTIVE : MultiStepIndicator.stepStatuses.PENDING,
            titleText: "3 - Approve",
            subtitleText: ""
        }]
    )
}



export default SetupSteps;