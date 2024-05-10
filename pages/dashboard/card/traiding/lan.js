const lan = [
    { text: "Waiting for information", color: '' },
    { text: "Waiting for confirmation", color: '' },
    { text: "Active trading", color: 'green' },
    { text: "Waiting for payment", color: 'red' },
    {
        text: "Pause", color: 'red'
    },
    {
        text: "Finished", color: 'green'
    }
]

export const GetLan = (account, botStatus, curr) => {
   
    if(curr) {
        console.log("curr true")
        if(account === 0) {
            return lan[0]
        }
    
        if(account === 4) {
            if(account === 4 && botStatus) {
                return lan[2]
            } else {
                return lan[4]
            }
        }
    
        if(account === 5) {
            return lan[3]
        }
    } else {
        return lan[5]
    }
   
}