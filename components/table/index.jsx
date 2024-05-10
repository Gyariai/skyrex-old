import { useState } from 'react'

import { Row } from './row'
import { Cell } from "./cell"

import { Paggination } from '../paggination'

export const Table = ({ rows, cell, pages = 10, mobile = "mobile", sort, row_class = "trading-table-row-col"}) => {
    const  [ active, setActive ] = useState(1)
    
    return (
        <div className={mobile !== "none" ? "trading-table " + (sort ? "trading-table-sort" : ""): "commissions-inner"}>
            <Row rows={rows} mobile={mobile} row_class={row_class}/>
            <Cell rows={rows} cell={cell} active={active} pages={pages} mobile={mobile} />
            <Paggination len={cell.length} pages={pages} active={active} setActive={setActive}/>
        </div>
    )
}