import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { set_confirm_calendar, set_form_account_status, set_form_bot_status, set_update_balane } from '../../../../_dispatch/user'

import { LoadAnimate } from "../../../../lib/fabe"

import { Calendar } from './calendar'
import { Input } from "./input"
import { Range } from "./range"

import { formatNumber } from "../../../../Action/number"
import { monthSplit, checkActiveMonth } from "../../../../Action/balance"

import { set_user_trade_start, set_user_bot_status_set } from '../../../../axios/trade'

import { getuserdata } from "../../../../axios/user"
import { set_user_data } from "../../../../_dispatch/user"

import { toast } from "react-toastify"

import { GetLan } from "./lan"

export const Traiding = ({ active }) => {
    const dispatch = useDispatch()
    const { currBalance, balance } = useSelector(state => state.userdata)

    const url = useSelector(state => state.global.url)
    const botStatus = useSelector(state => state.userdata.botStatus)
    const { uuid, balanceform, account } = useSelector(state => state.userdata.user)

    const max = useSelector(state => state.userdata.usdtBalance)
    const min = 3000

    const curr = checkActiveMonth(currBalance, balance)

    const [ fetching, setFetching ] = useState(false)

    const Back = () => {
        dispatch(set_confirm_calendar(monthSplit(balance)))
    }

    const disabled = (botStatus && account === 4) || (account === 5) || (curr === false)

    const Send = async () => {
        if(balanceform >= min && balanceform <= max && fetching === false) {
            setFetching(true)
            const result = await set_user_trade_start({ uuid, balanceform })
            setFetching(false)
            if(result?.status) {
                toast.success("Information you provided is successfully verified. Trading starts now!")
                
                dispatch(set_form_bot_status(true))
                dispatch(set_form_account_status(4))
                dispatch(set_update_balane())

                const user = await getuserdata(url.key)
              
                // eslint-disable-next-line
                await new Promise((req, _) => {
                    setTimeout(() => { req(true) }, 3000)
                })
       
                if(result) {
                    dispatch(set_user_data(user))
                }
            }

            
            
            if(result?.status === false) {
                toast.error(result.message)
            }
        }
    }

    const Stop = async () => {
        if(fetching === false) {
            setFetching(true)
            const result =  await set_user_bot_status_set(uuid)

            if(result?.status === false) {
                dispatch(set_form_bot_status(false))
            }

            setFetching(false)
        }
        
    }

    let lan = GetLan(account, botStatus, curr)

    return (
        <div className={`dashboard-row-item dashboard-trading ${active}`}>
            <p className="dashboard-row-item-title">
                Trading period
            </p>
            <div className="dashboard-mob-row">
                <Calendar />
                <p className="dashboard-row-item-status">
                    <span className={`semi-bold ${lan.color}`}>{lan.text}</span>
                </p>
            </div>
            <div className="dashboard-trading-passive">
                <div className="dashboard-row-item-inner">
                    <p className="dashboard-row-item-inner-title">
                        Trading balance
                    </p>
                    <Input min={min} max={max} disabled={disabled}/>
                </div>
                <div className="dashboard-row-item-inner">
                    <p className="dashboard-row-item-inner-title">
                        Available: <span className="medium">{formatNumber(max)}</span> USDT
                    </p>
                    <Range  min={min} max={max} disabled={disabled}/>
                </div>
                <div className="dashboard-btn-block">
                    {
                        curr === false ? 

                        <div className="dashboard-btn-block-item" onClick={() => Back()}>
                            <div className="dashboard-btn dashboard-btn-pause">
                                Back to active period
                            </div>
                        </div>

                        :

                        <>
                        
                        {
                            botStatus === false ?
                                <div className="dashboard-btn-block-item">
                                    <div 
                                        className={"dashboard-btn dashboard-btn-start"}
                                        onClick={() => Send()}
                                    >
                                         <>Start&nbsp;<LoadAnimate status={fetching}/></>    
                                    </div>
                                </div>
                            : null
                        }

                        {
                            botStatus ? 
                                <div className="dashboard-btn-block-item">
                                    <div 
                                        className="dashboard-btn dashboard-btn-pause"
                                        onClick={() => Stop()}
                                    >
                                        Pause&nbsp;<LoadAnimate status={fetching}/>
                                    </div>
                                </div>
                            : null
                        }
                        </>
                    }
                   
                    <div className="dashboard-btn-block-item"></div>
                </div>
            </div>
        </div>
    )
}

