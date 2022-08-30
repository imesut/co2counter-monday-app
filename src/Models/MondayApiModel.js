import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

const strategyKey = "carbon-key"
var carbonBoardId = 0


export function retrieveBoardData() {
    return new Promise((resolve, reject) => {
        monday.listen("context", res => {
            let boardId = res.data.boardIds[0];
            console.log("boardId", boardId);
            carbonBoardId = boardId;
            
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
                resolve(cols)
            })
        }
        )
    })
}


export function getStrategyData() {
    monday.storage.instance.getItem(strategyKey).then(res => {
        console.log("carbon-key", res.data.value);
        let object = JSON.parse(res.data.value);
        return object;
    });
}

export function setStrategyData(object) {
    let stringValue = JSON.stringify(object);
    monday.storage.instance.setItem(strategyKey, stringValue).then(res => {
        console.log("carbon-key", res.data.value);
    })
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



