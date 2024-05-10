import moment from "moment-timezone"
import { sort30 } from './30'


export const GetDataPeriod = (cell, balance) => {
    cell.sort((a, b) => {
        const aDate = a.closed_at ?  Number(moment(a.closed_at).utc().format("DD")) : Number(moment().utc().format("DD"))
        const bDate = b.closed_at ?  Number(moment(b.closed_at).utc().format("DD")) : Number(moment().utc().format("DD"))

        if (aDate > bDate) {
            return 1;
        } else if (bDate > aDate) {
            return -1;
        } else {
            return 0;
        }
    })

    let d_sort = {}
   
    cell.forEach(e => {
        
        const day = e.closed_at ?  Number(moment(e.closed_at).utc().format("DD")) : Number(moment().utc().format("DD"))

        if(d_sort[day]?.name === Number(day)) {
            d_sort[Number(day)].pv = d_sort[Number(day)].pv + Number(e.final_profit)
        } else {
            d_sort[Number(day)] = {
                name: Number(day),
                pv: Number(e.final_profit),
                date: e.closed_at ?  moment(e.closed_at).utc().format("DD.MM.YYYY") : moment().utc().format("DD.MM.YYYY"),
            }

            
        }
       
    });

    
    const r = Object.entries(d_sort)
    let res = []

    r.forEach(v => {
        const c = [...res]
        const a = c.concat(v[1])
        res = a
    })

    const send = []

    let start = Number(balance)
    res.forEach(v => {
        start = start + v.pv
        const c = {...v}
        c.pv = start
        send.push(c)
    })

    return send
}

export const getDataDay = (cell) => {  /// профит за день
    const res = []

    let day = cell[0].closed_at ? Number(moment(cell[0].closed_at).utc().format("DD")) : Number(moment().utc().format("DD"))


    let sum = 0
    let i = 0
    let index = 0

    cell.forEach(v => {
        const dayCurr = v.closed_at ? Number(moment(v.closed_at).utc().format("DD")) : Number(moment().utc().format("DD"))
        i = i + 1
        
        if(day === dayCurr) {
            sum = sum + Number(v.final_profit)
        } else {
            res.push({
                name: Number(day),
                pv: sum,
                index: index
            })

            index = index + 1

            day = dayCurr
            sum = Number(v.final_profit)
        }


        if(i === cell.length) {
            res.push({
                name: Number(day),
                pv: sum,
                index: index
            })
        }
    })


    const result = sort30(res)
   
    return result
}

export const getDataAsset = (cell) => {
   
    const asset = {}

    cell.forEach(v => {
        if(asset[v.pair]) {
            asset[v.pair] = asset[v.pair] + Number(v.final_profit)
        } else {
            asset[v.pair] = Number(v.final_profit)
        }
    })

    const arr = []
    
    for (const [key, value] of Object.entries(asset)) {
        const name = key.split("_")
        arr.push({
            name: name[0] + " " + name[1],
            pv: Number(value)
        })
    }
    
    const result = sort30(arr)

    result.sort((a, b) => {
        const aDate = a.pv
        const bDate = b.pv

        if (aDate < bDate) {
            return 1;
        } else if (bDate < aDate) {
            return -1;
        } else {
            return 0;
        }
    })
    
    return result
}