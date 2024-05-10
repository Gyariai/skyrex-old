import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { LoadAnimate } from "../../../lib/fabe"
import { Paggination } from "../../../components/paggination"
import { Search } from "../../../components/search"
import { GraphPie } from "../../../components/pie"

import { Row } from "./table/row"

import { get_token_account } from "../../../axios/user"
import { sort_search, sortposition } from "../../../Action/sort"

import { set_url_params_links } from "../../../_dispatch/menu"

import { formatNumber } from '../../../Action/number'

export const AccoutData = () => {
    const dispatch = useDispatch()
    const [tokenTable, setTokenTable] = useState([])

    const [tokenData, setTokenData] = useState([])
    const [active, setActive] = useState(1)
    const [search, setSearch] = useState("")
    
    const [fetchData , setFetchData] = useState(false)

    const user_id = useSelector(state => state.userdata.user.user_id)
    const { row_enchange, table_enchange } = useSelector(state => state.table)

    const [firstLoad, setFirstLoad ] = useState(false)
    const fetchToken = async () => {

        if(user_id === "demo") {
           setTokenData([
                {
                    symbol: "USDT",
                    percentage: 100,
                    btc_value: 0.01277394,
                    price: 1.00,
                    amount: 1200000.00,
                    usd_value:  1200000.00
                }
           ])

           setFirstLoad(true)
        } else {
            setFetchData(true)

            const result = await get_token_account(user_id)
 
            if(result) {
                setTokenData(setCell(result))
                
                setFirstLoad(true)
            }
    
            setFetchData(false)
        }

        
    }

    useEffect(() => {
        if(fetchData === false && !!user_id) {
            fetchToken()
            setInterval(() => {
                fetchToken()
            }, 10000)
           
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user_id])

    useEffect(() => {
        let serch_res = sort_search(tokenData, search, "symbol")
                
  
        let sort_res = sortposition(serch_res, table_enchange)

        setTokenTable(sort_res)

    }, [search, active, tokenData, table_enchange])

    let tableData = []

    const page = 7
    const min = (active -1) * page
    const max = min + page -1


    for(let i = 0; i < tokenTable.length; i++) {
        if( i >= min  && i <= max) {
            tableData.push(tokenTable[i])
        }
    }

 
    return (
        <div className="exchange-block" style={{ display: user_id ? "block" : "" }}>
            <div className="exchange-block-header">
                <div className="exchange-block-header-title ">
                    <p className='flex_center'>
                        <span>Account</span> 
                        <span
                            onClick={() => fetchToken()}
                            style={{ cursor: 'pointer' }} 
                            className="exchange-block-header-title-icon"
                        >
                            {
                                fetchData ? <LoadAnimate status={true}/> : <img src="https://skyrex.io/img/exchange-icon.svg" alt=""/>
                            }
                        </span>
                    </p>
                </div>
                <Search onChange={setSearch}/>
                <Paggination len={tokenTable.length} active={active} setActive={setActive} pages={page}/>
            </div>
            {
                firstLoad ?
                <div className="exchange-block-content">
                    <div className="exchange-block-diadram-container">
                        <GraphPie table={tokenData}/> 
                    </div>
                    <div className="exchange-block-table trading-table-sort">
                        <Row rows={row_enchange} text_table={"table_enchange_text"} table_store={"enchange"}/>
                        {
                            tableData.map((v, i) => {
            
                                return (
                                    <div key={i} className="exchange-block-table-row">
                                        <div className="exchange-block-table-row-col">
                                            <p className="medium flex_center">
                                                {v.symbol}
                                            </p>
                                        </div>
                                        <div className="exchange-block-table-row-col">
                                            <p className="exchange-block-table-row-col-title">
                                                {row_enchange[1].text}
                                            </p>
                                            <p>{v.percentage}</p>
                                        </div>
                                        <div className="exchange-block-table-row-col">
                                            <p className={""} style={{whiteSpace: "nowrap"}}>{v.btc_value}</p>
                                        </div>
                                        <div className="exchange-block-table-row-col">
                                            <p className="exchange-block-table-row-col-title">
                                                {row_enchange[3].text}
                                            </p>
                                            <p style={{whiteSpace: "nowrap"}}>{formatNumber(v.price)}</p>
                                        </div>
                                        <div className="exchange-block-table-row-col">
                                            <p className="exchange-block-table-row-col-title">
                                                {row_enchange[4].text}
                                            </p>
                                            <p style={{whiteSpace: "nowrap"}}>{v.amount}</p>
                                        </div>
                                        <div className="exchange-block-table-row-col t-right">
                                            <p className="exchange-block-table-row-col-title">
                                                {row_enchange[5].text}
                                            </p>
                                            <p style={{whiteSpace: "nowrap"}}>{formatNumber(v.usd_value)}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Paggination len={tokenTable.length} active={active} setActive={setActive} pages={page}/>
                </div>
                : null
            }
            
            <div className="exchange-btn">
                {/* eslint-disable-next-line */}
                <a onClick={() => dispatch(set_url_params_links(0))} style={{cursor: "pointer"}}>
                    Trade
                </a>
            </div>
        </div>
    )
}

const setCell = (table) => {
    const cell = []
    table.forEach(v => {
        if(Number(v.usdt.total) >= 1) {
            cell.push({
                symbol: v.symbol,
                percentage: Number(Number(v.share).toFixed(2)),
                btc_value: Number(v.btc.total),
                price: Number(Number(v.usdt.total) / Number(v.total)).toFixed(2),
                amount: Number(Number(v.total).toFixed(2)),
                usd_value:  Number(Number(v.usdt.total).toFixed(2))
            })
        }
     
    });
    return cell
}