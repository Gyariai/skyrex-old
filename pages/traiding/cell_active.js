import { formatNumber } from '../../Action/number'

import { utc_table } from '../../Action/utc'
import { urlSearchParams } from '../../Action/store/url'

export const active_cell_jsx = (cell, row, select_menu_utc) => {
    const result = []
    
    cell.forEach(c => {
        let cells_new = {}
       
        row.forEach(r => {
            const cell_curr = c[r.index]
 
            if(r.index === "pair") {
                const split_cell = cell_curr.split(" ")
                cells_new[r.index] = (
                    <>
                        <p style={{whiteSpace: "nowrap"}}>
                            <span className="medium">{split_cell[0]}</span> {split_cell[1]}
                        </p>
                    </>
                )
            }

            if(r.index === "created_at"){
              
                const utc = utc_table(select_menu_utc.value, cell_curr)

                cells_new[r.index] = (
                    <>
                        <p className="trading-table-mod-title">
                            Open date
                        </p>
                        <p style={{whiteSpace: "nowrap"}}>
                            {urlSearchParams().key ? utc : cell_curr}
                        </p>
                    </>
                )
            }

            if(r.index === "bought_amount"){
                const cell_num = Number(cell_curr).toFixed(2)
                cells_new[r.index] = (
                    <>
                        <p className="trading-table-mod-title">
                            Amount
                        </p>
                        <p style={{whiteSpace: "nowrap"}}>
                            {cell_num}
                        </p>
                    </>
                )
            }

            if(r.index === "bought_average_price"){
                const cell_num = (Number(cell_curr).toFixed(1))

                cells_new[r.index] = (
                    <>
                        <p className="trading-table-mod-title">
                            Total
                        </p>
                        <p style={{whiteSpace: "nowrap"}}>
                            {`$${formatNumber(cell_num)}`}
                        </p>
                    </>
                )
             
            }

            if(r.index === "bought_volume"){
                const cell_num = (Number(cell_curr).toFixed(1))

                cells_new[r.index] = (
                    <>
                        <p className="trading-table-mod-title">
                            Buy price
                        </p>
                        <p style={{whiteSpace: "nowrap"}}>
                            {`$${formatNumber(cell_num)}`}
                        </p>
                    </>
                )
             
            }

            if(r.index === "final_profit"){
                const cell_num = cell_curr
                cells_new[r.index] = (
                    <>
                        <p style={{whiteSpace: "nowrap"}} className={Number(cell_curr) >= 0 ? "green" : "red"}>
                            {`$${formatNumber(cell_num)}`}
                        </p>
                    </>
                )
            }
           
        })
        result.push(cells_new)
    });

    return result.reverse()
}