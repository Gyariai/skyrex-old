import {commision, lvl } from '../Action/commisison'

export const getDataMonth = (trades, currBalance, high, persent, resultMonth) => {
   
    let income = 0
    let plusDeals = 0
    let minusDeals = 0
    let profitPer = 0
    let watermark = 0

    let com_per = 0

    let tradeAmount = 0
    let tradeSuccsess = 4
    let lvlComm = 1

    trades.forEach(value => {
        income = income + Number(value.final_profit)
        if(value.final_profit > 0) { plusDeals = plusDeals + 1 } else { minusDeals = minusDeals + 1 }
        tradeAmount = tradeAmount +  1
    })

    income = Number(income.toFixed(2))

    // процент коммисии
    com_per = persent > 0 ? (persent / 100) : commision(currBalance[currBalance.length - 1].balance)
    
    // процент профита от баланса
    profitPer = income === 0 ? 0 : income / ((currBalance[currBalance.length - 1].balance) / 100)

    // процент удачных трейдов
    tradeSuccsess = plusDeals / (tradeAmount / 100)

    // ватермарк
    watermark = (income - high > 0 ? income - high : 0) * com_per

    tradeSuccsess = Number(tradeSuccsess.toFixed())

    lvlComm = lvl(com_per)


    resultMonth.results.forEach(v => {
        const date = v.date.split("-")
        const year = Number(date[0])
        const month = Number(date[1]) - 1

        if(resultMonth.currbalance.year === year && resultMonth.currbalance.month === month) {
            console.log(v)
            income = v.profit
            watermark =  v.comm
        }
    })

    return {
        income, plusDeals, minusDeals, profitPer, watermark, com_per, tradeSuccsess, tradeAmount, lvlComm
    }
}

export const get_statistic = (cellPage, active_stat) => {

    let active = 0
    let fund = 0
    let unrelise = 0
    let ammount = 0


    if(active_stat === false) {
        return {
            active, fund: 0, unrelise : 0, ammount
        }
    }
   
    if(cellPage.length) {
        cellPage.forEach(v => {
            active = active + 1
            fund = fund + Number(v.bought_average_price)
            ammount = Number(v.bought_average_price)
            unrelise = unrelise + Number(v.final_profit)
        });
    } else {
        return {
            active, fund: 0, unrelise : 0, ammount
        } 
    }

    return {
        active, fund: fund, unrelise : unrelise
    }
}