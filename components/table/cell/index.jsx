import { useState, useEffect } from 'react'

export const Cell = ({ rows, cell, active, pages, mobile = "mobile" }) => {
    const [ cell_active, set_cell_active ] = useState(cell)

    useEffect(() => {
        const c = []

        for (let index = 0; index < cell.length; index++) {
            let min = active * pages - pages
            let max = active * pages
            if(index >= min && index < max ) {
                c.push(cell[index])
            }
            
        }

      
        set_cell_active(c)

    }, [cell, active, pages])

    
    return cell_active.map((v, i) => {
        return (
            <div key={i} className={mobile !== "none" ? "trading-table-row " : "commissions-inner-row"}>
                {
                    rows.map((r, i) =>{
                        const s = r.index === "final_profit"
                                
                        return (
                            <div key={i} className={mobile !== "none" ? "trading-table-row-col " + (s ? "t-right" : "") : "commissions-inner-row-col" }>
                                {v[r.index]}
                            </div>
                        )
                    })
                }
            </div>
        )    
    })
}
        

