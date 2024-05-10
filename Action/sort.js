export const sort_search = (cell, input, s = "name") => {
    if(input.length < 1) return cell
    const c = []

    cell.forEach(v => {
        const name = v[s].toLowerCase()

        if(name.indexOf(input) >= 0) {
            c.push(v)
        }
       
    });


    return c
}

export const sortposition = (cell, sort) => {
    if(sort === false || !!sort === false){
        return cell
    }
    
    const res = cell.sort((a, b) => {
        const date = sort.index === "created_at" || sort.index === "closed_at" ? true : false

        const a_time = a[sort.index]
        const b_time = b[sort.index]

        let a_num = date ? a_time: Number(a[sort.index])
        let b_num = date ? b_time : Number(b[sort.index])
    
        if(sort.index === "symbol") {
            a_num = a[sort.index]
            b_num = b[sort.index]
        }

        if(sort.index === "name") {
            a_num = a[sort.index]
            b_num = b[sort.index]
        }

        if(sort.index === "price") {
            a_num = Number(a.usd_value) / Number(a.amount)
            b_num = Number(b.usd_value) / Number(b.amount)
        }

        if(sort.sort  === "-") {
            
            if (a_num > b_num) {
                return 1;
            } else if (b_num > a_num) {
                return -1;
            } else {
                return 0;
            }
        } else {

            if (a_num < b_num) {
                return 1;
            } else if (b_num < a_num) {
                return -1;
            } else {
                return 0;
            }
        }

    })

    return res
}
