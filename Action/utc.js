import moment from "moment-timezone"

export const utc_table = (utc, cell_curr) => {
    let curr = 0
    if(isNaN(cell_curr)) {
        

        curr = new Date(cell_curr).getTime()  + (1000 * 60 * 60 * utc)
    } else {
        curr = cell_curr + (1000 * 60 * 60 * utc)
    }
    

    return moment(curr).utc(3).format("DD.MM.YYYY HH:mm")
}


export const time_await = async (time = 5000) => {
    await new Promise((req, _) => {
        setTimeout(() => {
            req(true)
        }, time)
    })
}