import { calculateEmissionsFromExpenses, convertEmissionTypesToCategory } from "./MondayDataModel"
import { getMondayKeyVal, getStrategyDataFromMonday, setMondayKeyVal, setStrategyDataToMonday } from "./MondayApiModel"
import { eoyEmissionForecast } from "./Calculators";


let shouldCalculateAgain = (baseContext) => {
    return new Promise((resolve, reject) => {
        calculateEmissionsFromExpenses(baseContext).then((obj) => {
            let emission = obj.totalEmissions
            let offset = obj.offsetTotal

            baseContext.data.this_year.emission = emission
            baseContext.data.this_year.neutralized = offset
            baseContext.data.this_year.net = (emission - offset)
            baseContext.data.this_year.emissionLimit = eoyEmissionForecast(emission)
            baseContext.data.this_year.emissionDistribution = convertEmissionTypesToCategory(obj.emissionsByTypes)
            setStrategyDataToMonday(baseContext.data).then((isSaved) => {
                if(isSaved){
                    setMondayKeyVal("lastUpdatedTimestamp", Date.now()).then((isSuccess)=>{
                        console.log("strategy saving", isSuccess)
                        resolve(isSuccess)
                    })
                }
            })
        })
    })
}

export const initFromMonday = (baseContext, forceReload) => {
    getStrategyDataFromMonday().then((storedStrategyOnMonday) => {
        // Calculate if never calculated or deleted
        if (storedStrategyOnMonday === null) {
            shouldCalculateAgain(baseContext).then(() => baseContext.setState({ lastUpdatedTimestamp: lastUpdatedTimestamp }))
        } else {
            // last updated time 15 mins before
            getMondayKeyVal("lastUpdatedTimestamp").then((timestamp) => {
                if (timestamp !== null) {
                    let now = Date.now()
                    if (now - timestamp > 15 * 60 * 1000 || forceReload) {
                        shouldCalculateAgain(baseContext).then(() => {
                            setMondayKeyVal("lastUpdatedTimestamp", Date.now()).then((success)=>{
                                if(success){
                                    baseContext.setState({ lastUpdatedTimestamp: timestamp })
                                }
                            })
                        })
                    } else {
                        baseContext.data = storedStrategyOnMonday;
                        baseContext.setState({ lastUpdatedTimestamp: timestamp })
                    }
                } else {
                    baseContext.data = storedStrategyOnMonday;
                    baseContext.setState({ update: baseContext.state.update })
                }
            })
        }
    })

    getMondayKeyVal("breakdownCustomizationTipDismissed").then((value) => {
        if (value !== null) {
            baseContext.setState({ breakdownCustomizationTipDismissed: value })
        }
    })

}



