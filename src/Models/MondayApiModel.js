import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

const strategyKey = "carbon-key"

export function retrieveBoardData(baseContext) {
    return new Promise((resolve, reject) => {
        monday.listen("context", res => {
            let boardId = res.data.boardIds[0];
            // console.log("boardId", boardId);
            // let theme = res.data.theme //"dark" or "light"

            monday.api(`query {
                    boards (ids: ` + boardId + `) {
                    items {
                        column_values {
                        title
                        value
                        }
                    }
                }
            }`).then(cols => {
                // console.log(cols)
                monday.api(`query {
                    boards (ids: ` + boardId + `) {
                        views {
                            id
                            name
                            type
                        }
                    }
                }`).then((resp) => {
                    let views = resp.data.boards[0].views
                    views.forEach(view => {


                        switch (view.type) {
                            case "FormBoardView":
                                baseContext.state.offsetFormHref = "/boards/" + boardId + "/views/" + view.id
                                break;
                            case "TableBoardView":
                                if (view.name.indexOf("Expense") > -1) {
                                    baseContext.state.expenseTableHref = "/boards/" + boardId + "/views/" + view.id
                                }
                                break;
                            default:
                                break;
                        }
                    });

                    resolve(cols)
                })
            })
        }
        )
    })
}


export function getMondayKeyVal(key) {
    console.log("getMondayKeyVal")
    return new Promise((resolve, reject) => {
        monday.storage.instance.getItem(key).then(res => {
            // console.log(key, res.data.value);
            let object = JSON.parse(res.data.value);
            resolve(object);
        });
    })
}

export function setMondayKeyVal(key, value) {
    console.log("setMondayKeyVal")
    let stringValue = JSON.stringify(value);
    return new Promise((resolve, reject) => {
        monday.storage.instance.setItem(key, stringValue).then(res => {
            // console.log(key, res.data.value);
            // console.log(res)
            monday.storage.instance.setItem("lastUpdatedTimestamp", JSON.stringify(Date.now())).then(tmstmp => {
                resolve(res.data.success)
            })
        });
    })

}

export function getStrategyDataFromMonday() {
    return getMondayKeyVal(strategyKey);
}

export function setStrategyDataToMonday(object) {
    return setMondayKeyVal(strategyKey, object);
}








// export function sendNotification(text) {
//     monday.api(`mutation {
//         create_notification (user_id: 105939, target_id: 674387, text: "This is a notification", target_type: Project) {
//             ` + text + `
//         }
//     }
//     `)
// }

// monday.api(`query {
//     boards (ids: `+boardId+`) {
//         owners {
//             id
//         }
//         columns {
//             title
//             type
//         }
//     }
// }`).then(columns => {
//     console.log("columns", columns);
// });


// monday.storage.instance.setItem('carbon-key', 'Board View').then(res => {
//     console.log(res);
// });
// // monday.storage.instance.deleteItem('mykey');



// monday.api(`query { me { name } }`).then((res) => {
//   this.setState({ name: res.data.me.name });
//   console.log(res.data.me.name)
// });



