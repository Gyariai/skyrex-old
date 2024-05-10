/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"

import { Search } from '../../components/search'
import { Table } from '../../components/table'
import { Statistic } from "./statistic"

import { close_cell_jsx } from './cell_close'
import { active_cell_jsx } from './cell_active'

import { sortCell } from "../../Action/table"

import { get_active_demo } from "../../axios/trade"

import { urlSearchParams } from '../../Action/store/url'


export const Traiding = () => {
    const [ demo, setDaemo ] = useState([])
    const key = useSelector(state => state.global.url.key)
    const { row_active, row_closed, table_close, table_active, trades } = useSelector(state => state.table)
    const select_menu_utc = useSelector(state => state.global.select_menu_utc)

    const [ search_active, set_search_active ] = useState("")
    const [ search_close, set_search_close ] = useState("")

    const { active_cell_table, active_close_table } = sortCell(trades, search_active, search_close, table_active, table_close)

    const active_cell = active_cell_jsx(key ? active_cell_table : demo, row_closed, select_menu_utc)
    const close_cell = close_cell_jsx(active_close_table, row_closed, select_menu_utc)

    useEffect(() => {
        get_active_demo()
        .then((res) => {
            setDaemo(res)
        })
    }, [null])


    return (
        <>
            <h2 className="trading-block-title">
                Active trades
            </h2>
            <div className="trading-block-row">
             
                <div className="trading-block-row-item" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <Search onChange={set_search_active} />
                        <Table rows={row_active} cell={active_cell} pages={8}  table_store="active" sort={true}/>
                    </div>
                    {
                        !key ?
                        <div className="trading-block">
                            <h2 className="trading-block-title">
                                Closed trades
                            </h2>
                            <Search onChange={set_search_close} />
                        </div>
                        : null
                    }
                </div>
                <div className="trading-block-row-item">
                    <Statistic active_cell={key ? active_cell_table : demo}/>
                </div>
                
            </div>
           
            {
                !!urlSearchParams().key ?
                <div className="trading-block">
                    <h2 className="trading-block-title">
                        Closed trades
                    </h2>
                    <Search onChange={set_search_close} />
                    <Table rows={row_closed} cell={close_cell} pages={8}  table_store="close" sort={true}/>
                </div>
                :
                <div className="trading-block">
                    <Table rows={row_closed} cell={close_cell} pages={8}  table_store="close" sort={true}/>
                </div>
            }
      
        </>
    )
}