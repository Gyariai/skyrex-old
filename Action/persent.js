export const getPersent = (cell, startBalance) => {        
    const newTable = []
            
    const one = startBalance / 100

    cell.forEach(v => {
    const profit =  v.pv
        newTable.push({
            name: v.name,
            pv: (profit / one ),
            index: v.index
        })
    })

    return newTable
}

export const getPersentLine = (cell, balance, status, nodata) => {

    const startBalance = nodata ? 5000 : balance
        
    const newTable = []
            
    const one = startBalance / 100

    const min = status ? 100 : 0

    cell.forEach(v => {
    const profit =  v.pv
        newTable.push({
            name: v.name,
            pv: (profit / one ) - min,
            index: v.index,
            date: v?.date
        })
    })

    return newTable
}