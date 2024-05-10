export const sortBalance = (balance) => {
    return balance.sort((a, b) => {
        const aDate = dateBalance(a.startdate)
        const bDate = dateBalance(b.startdate)
        if (aDate > bDate) {
            return 1;
        } else if (bDate > aDate) {
            return -1;
        } else {
            return 0;
        }
    })
}

export const sortBalanceSession = (balance) => {
    return balance.sort((a, b) => {
        const aDate = dateBalance(a.date)
        const bDate = dateBalance(b.date)
        if (aDate > bDate) {
            return 1;
        } else if (bDate > aDate) {
            return -1;
        } else {
            return 0;
        }
    })
}


const dateBalance = (date) => {
    const split = date.split("-")
    return new Date(split[0], Number(split[1]) - 1).getTime()
}

export const splitBalance = (balance) => {
    const split = balance.startdate.split("-")

    return {
        year: Number(split[0]),
        month: Number(split[1]) - 1,
    }
}

export const getBalanceYear = (balance, year) => {

    let result = false
    balance.forEach(value => {
        const split = value.startdate.split("-")

        if(Number(split[0]) === year) {
            result = {
                year: Number(split[0]),
                month: Number(split[1]) - 1
            }
        }
    });
    
    return result
}

export const getBalanceMonth = (balance, year, month) => {
    
    let result = false
    if(Array.isArray(balance)) {

        balance.forEach(value => {
            const split = value.startdate.split("-")
    
            if((Number(split[1]) - 1) === month && Number(split[0]) === year) {
                result = {
                    year: Number(split[0]),
                    month: Number(split[1]) - 1
                }
            }
        });
    }

    
    return result
}

export const getCurrBalance = (user) => {
    let res = 10000
    if(Array.isArray(user?.balance)) {
        user.balance.forEach(v => {
            const date = v.startdate.split("-")
            const year = Number(date[0])
            const month = Number(date[1]) - 1
            
            if(year === user.currBalance.year && month === user.currBalance.month) {
                res = v.balance
            }
        })

    }
    return res
}

export const checkActiveMonth = (curr, dates) => {
    
    const split = monthSplit(dates)

    const year = split.year
    const month = split.month

    if(curr.year === year && curr.month === month) {
        return true
    } else {
        return false
    }
}

export const monthSplit = (dates) => {
    const split = (dates[dates.length - 1].startdate).split("-")

    const year = Number(split[0])
    const month = Number(split[1]) - 1

    return {
        year: year,
        month: month
    }
}