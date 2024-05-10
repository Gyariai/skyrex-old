import moment from 'moment'

export const data_no = [
    {
        name: 1, pv: 100,
    },
    {
        name: 2, pv: 150,
    },
    {
        name: 3, pv: 180,
    },
    {
        name: 4, pv: 210,
    },
    {
        name: 5, pv: 220,
    },
    {
        name: 6, pv: 230,
    },
    {
        name: 7, pv: 220,
    },
    {
        name: 8, pv: 250,
    },
    {
        name: 9, pv: 230,
    },
]


export const noDataDay = (status, mounthCurr) => {
    let res = []
    const d = moment().format("DD")
    res.push({
        name: d,
        pv: status === "%" ? 100 : mounthCurr,
    })

    return res
}

export const noDataAsset = (status, mounthCurr) => {
    let res = []
    res.push({
        name: "USDT_BTC",
        pv: status === "%" ? 100 : mounthCurr,
    })

    return res
}



export const noDataLine= (status, mounthCurr) => {
    let res = []
    const d = moment().format("DD")

    res.push({
        name: d,
        pv: status === "%" ? 100 : mounthCurr,
        index: d,
        date: moment().format("DD.MM.YYYY")
    })
    return res
}