import { useState } from 'react'
import { useSelector } from 'react-redux'

import { GetExel } from "../../../axios/table"

import moment from "moment"

export const Export = () => {
    const [ load, setLoad ] = useState(false)
    const cell = useSelector(state => state.table.trades)

    const Click = async () => {

        if(load === false) {
            const cellData = []

            cell.forEach(v => {
                v.created_at = moment(v.created_at).format("DD-MM-YYYY HH:mm")
                v.closed_at  = v.closed_at ? moment(v.closed_at).format("DD-MM-YYYY HH:mm") : moment().format("DD-MM-YYYY HH:mm")
                cellData.push(v)
            })
            setLoad(true)
            await GetExel({
                pair: "Pair",
                created_at: "Open date",
                closed_at: "Close date",
                bought_amount: "Amount",
                bought_average_price: "Total",
                bought_volume: "Buy price",
                sold_average_price: "Sell price",
                final_profit: "Return"
            }, cellData )
            
            setLoad(false)
        }
        
    }

    return (
        <div className="trading-block-btn" >
            <div onClick={() => Click()}className="dashboard-btn export">Export to XLS</div>
        </div>
    )
}