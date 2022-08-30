import { calculateEmissionsFromExpenses, convertEmissionTypesToCategory } from "./MondayDataModel"
import { getMondayKeyVal, getStrategyDataFromMonday, setStrategyDataToMonday } from "./MondayApiModel"
import { eoyEmissionForecast } from "./Calculators";
import { calculateAnnualTargets } from "./Calculators"


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
                console.log("strategy saving", isSaved)
                resolve(isSaved)
            })
        })
    })
}

export const initFromMonday = (baseContext, forceReload) => {
    getStrategyDataFromMonday().then((obj) => {
        // Calculate if never calculated or deleted
        if (obj === null || forceReload) {
            shouldCalculateAgain().then(() => baseContext.setState({ update: baseContext.state.update }))
        } else {
            // last updated time 15 mins before
            getMondayKeyVal("lastUpdatedTimestamp").then((lastUpdatedTimestamp) => {
                if (lastUpdatedTimestamp !== null) {
                    let now = Date.now()
                    if (now - lastUpdatedTimestamp > 15 * 60 * 1000) {
                        shouldCalculateAgain().then(() => {
                            baseContext.setState({ lastUpdatedTimestamp: baseContext.state.lastUpdatedTimestamp })
                        })
                    } else {
                        baseContext.data = obj;
                        baseContext.setState({ update: baseContext.state.update })
                    }
                } else {
                    baseContext.data = obj;
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



