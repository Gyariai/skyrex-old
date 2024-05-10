




export const sort30 = (cell, l = 30) => {
    let len = l

    if(window.innerWidth < 993) {
        len = 5
    }

    if(cell.length < len) {
        return cell
    } else {
        const newCell = []
        const Reserve = []

        const int = Math.round((cell.length / len))
        newCell.push(cell[0])
        newCell.push(cell[cell.length - 1])
        let i = 0
        
        cell.forEach(v => {
            if( i % int === 0 && i !== 0 && i !== cell.length - 1) {
                newCell.push(v)
            } else {
                if( i !== 0 && i !== cell.length - 1) {
                    Reserve.push(v)
                }
            }
            i = i + 1
        });

        if(newCell.length === len) {
           
            return newCell
        }

        if(newCell.length > len) {
            const minus = newCell.length - len

            const interval = Math.floor((newCell.length / minus))
            
       
            for(let i = minus; i > 0; i--) {
                const num = interval * i === newCell.length ? (interval - 1) * i : interval * i
                newCell.splice(num , 1)
            }

            const res = Sort(newCell)
 
            return res
        }

        if(newCell.length < len) {
            const plus = len - newCell.length
            const interval = Math.floor((Reserve.length / plus))

       
            for(let i = plus; i > 0; i--) {
                const num = interval * i === Reserve.length ? Reserve.length - 1 :  interval * i

                newCell.splice(0 , 0, Reserve[num])
            }

            const res = Sort(newCell)
         

            return res
        }
    
    }
}

const Sort = (data) => {
    return data.sort((a, b) => {
        if (a.index > b.index) {
            return 1;
        } else if (b.index > a.index) {
            return -1;
        } else {
            return 0;
        }
    })
}