

import { Traiding } from "./card/traiding"
import { Income } from "./card/income"
import { Trade } from "./card/trade"
import { Commision } from "./card/commision"

import { getDataMonth } from "../../Action/getdatamoth"

import { GraphTitle } from "./graphTitle"

import { Connect } from './connect/connect'

import { useSelector } from 'react-redux'

export const Dashboard = () => {    
    const key = useSelector(state => state.global.url.key)

    const account = useSelector(state => state.userdata.user.account)

    const high_watermark =  useSelector(state => state.userdata.user.high_watermark)

    const currbalance =  useSelector(state => state.userdata.currBalance)
    const results = useSelector(state => state.table.results)

    const { income, profitPer, watermark, com_per, tradeSuccsess, tradeAmount, lvlComm } = getDataMonth(
        useSelector(state => state.table.trades), 
        useSelector(state => state.userdata.balance), 
        high_watermark,
        useSelector(state => state.userdata.user.persent),
        {
            currbalance, results
        }
    )
    
    return (
        <> 
            {
                !!key ? <Connect value={"connectGlobal"}/> : null
            }
            
            <div className="dashboard-row">
                <Traiding active={account === 0 ? "active" : ""}/>
                <Income active={account === 4 ? "active" : ""} income={income} profitPer={profitPer}/>
                <Trade active={account === 4 ? "active" : ""} tradeSuccsess={tradeSuccsess} tradeAmount={tradeAmount}/>
                <Commision active={account === 5 ? "active" : ""} watermark={watermark} com_per={com_per} lvlComm={lvlComm} high_watermark={high_watermark}/>
            </div>
            <div className="dashboard-graph">
                <GraphTitle />
            </div>
        </>
    )
}