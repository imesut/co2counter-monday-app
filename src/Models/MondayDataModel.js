import { retrieveBoardData } from "./MondayApiModel"

//Expense
let expenseAmountKey = "Expense Amount"
let expenseTypeKey = "Expense Type"

//Calculator
let co2unitPerGBPkey = "CO2/Unit - Expense"

//Ofsets
let offsetAmountKey = "Offset Amount (KG)"

var expenseAmntColNum = 0
var expenseTypeColNum = 0
var co2gbpColNum = 0
var offsetColNum = 0

export function calculateEmissionsFromExpenses() {

    return new Promise((resolve, reject) => {

        let boardData = retrieveBoardData()

        boardData.then((resp) => {
            let items = resp.data.boards[0].items
            let firstItem = items[0].column_values
            let colNames = firstItem.map(i => i.title)

            defineColumns(firstItem);

            let expensesByTypes = getExpenseTotalsByTypes(items, expenseTypeColNum, expenseAmntColNum);
            let calculator = getCalculatorTypes(items, expenseTypeColNum, co2gbpColNum);
            let emissionsByTypes = getEmissionsByTypes(expensesByTypes, calculator);
            let totalEmissions = getTotalEmissions(emissionsByTypes)
            let offsetTotal = offsetSum(items, offsetColNum);

            let objects = {
                "expensesByTypes": expensesByTypes,
                "calculator": calculator,
                "emissionsByTypes": emissionsByTypes,
                "totalEmissions": totalEmissions,
                "offsetTotal": offsetTotal
            }

            resolve(objects);
        }
        )
    })
}


export function convertEmissionTypesToCategory(typeObjectArray) {
    var categories = []
    typeObjectArray.forEach(typeObject => {
        categories.push(
            {
                "category": typeObject.type,
                "Emission": typeObject.value,
                "Potential Reduction": typeObject.value / 2
            })
    });
    return categories

    // { "category": "Electricity", "Emission": 50000, "Potential Reduction": 35000 },
    // { "category": "Flights", "Emission": 20000, "Potential Reduction": 19000 },
    // { "category": "Taxi", "Emission": 35000, "Potential Reduction": 33000 }

}

let defineColumns = (firstItem) => {
    // console.log(firstItem)
    for (let i = 0; i < firstItem.length; i++) {
        switch (firstItem[i]["title"]) {
            case expenseAmountKey:
                expenseAmntColNum = i
                break;
            case expenseTypeKey:
                expenseTypeColNum = i
                break;
            case co2unitPerGBPkey:
                co2gbpColNum = i
                break;
            case offsetAmountKey:
                offsetColNum = i
                break;
            default:
                break;
        }
    }
}

let getValsForPairs = (items, col1, col2) => {

    let pairlist = items.map(i => ({
        "type": JSON.parse(i.column_values[col1].value),
        "value": JSON.parse(i.column_values[col2].value) * 1
    }))

    var result = [];
    pairlist.reduce(function (res, value) {
        if (!res[value.type]) {
            res[value.type] = { type: value.type, value: 0 };
            result.push(res[value.type])
        }
        res[value.type].value += value.value;
        return res;
    }, {});

    result = result.filter(i => i.value > 0)

    return result
}

let getExpenseTotalsByTypes = (items, expenseTypeColNum, expenseAmntColNum) => {
    return getValsForPairs(items, expenseTypeColNum, expenseAmntColNum)
}

let getEmissionsByTypes = (expensesByTypes, calculatorTypes) => {

    let emissionsByTypes = []

    expensesByTypes.forEach(expense => {
        var carbonMultiplier = calculatorTypes[expense.type]
        carbonMultiplier = carbonMultiplier !== undefined ? carbonMultiplier : 0
        emissionsByTypes.push({ "type": expense.type, "value": expense.value * carbonMultiplier })
    });

    return emissionsByTypes
}

let getCalculatorTypes = (items, expenseTypeColNum, co2gbpColNum) => {
    let vals = getValsForPairs(items, expenseTypeColNum, co2gbpColNum)
    var obj = {}
    vals.forEach(val => {
        obj[val.type] = val.value
    });
    return obj
}

let getTotalEmissions = (byCategory) => {
    return byCategory.reduce((t, c) => t + c.value, 0)
}

let offsetSum = (items, offsetColNum) => {
    return items.reduce((t, c) => t + (JSON.parse(c.column_values[offsetColNum].value) * 1), 0)
}


