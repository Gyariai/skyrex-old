import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { formatNumber } from '../../../../../Action/number'

import { FabeCont, LoadAnimate } from '../../../../../lib/fabe'
import { continue_traiding } from "../../../../../axios/user"
import { getuserdata } from "../../../../../axios/user"
import { set_user_data } from "../../../../../_dispatch/user"

import axios from "axios"

export const PopPlus = ({ popPlus, setPopPlus, watermark }) => {
    const [ input, setInput ] = useState("")

    const [ statusTransaction, setStatusTranasaction ] = useState("")
    const [ fetching, setFetching ] = useState(false)

    const dispatch = useDispatch()
    
    const email = useSelector(state => state.userdata.user.email)
    const url = useSelector(state => state.global.url)


    const Send = async () => {
        if(statusTransaction) {
            setFetching(true)
            await continue_traiding(email, input)
        

            const result = await getuserdata(url.key)
            if(result) {
                dispatch(set_user_data(result))
            }
    
            setStatusTranasaction("")
            setPopPlus(false)
        }
    }

    const onChange = async (value) => {
        const res = await axios.get(`https://apilist.tronscan.org/api/transaction-info?hash=${value}`)

        if(res?.data?.confirmed) {
            setStatusTranasaction(true)
        } else {
            setStatusTranasaction(false)
        }

        setInput(value)

    }

    return(
        <FabeCont 
            className={statusTransaction === false ? "change-password pay-two mod border-red" : "change-password pay-two mod"}
            status={popPlus} close={() => setPopPlus(false)}
        >
            <div 
                className={statusTransaction === false ? "mod-close back-red" : "mod-close back" }
                onClick={() => setPopPlus(false)} style={{cursor: 'pointer'}}
            >
                <img src="https://skyrex.io/img/mod-close.svg" alt=""/>
            </div>
            <p className="pay-one-title">Send finished period profit sharing commission using USDT TRC-20 and paste transaction ID in the fied below</p>
            <p className="pay-one-slogan">Profit sharing commission amount:{" "}</p>
            <p className="pay-two-numbers">
                {formatNumber(watermark.toFixed(2))}{" "}USDT
            </p>
            <p className="pay-one-slogan">
                USDT TRC-20 wallet address
            </p>
            <p className="pay-two-numbers">
                TTKkcdxvwHgorzBYd8dGjj12iNthhY1WPj
            </p>
            <div className="pay-two-qr" style={{ display: 'flex', justifyContent: "center" }}>
                <img src="/img/qr.png" alt="" />
            </div>
            <p className="pay-two-input-name">
                Transaction ID
            </p>
            <div className="dashboard-row-item-inner-input">
                <input 
                    className='input_tx'
                    type="text" 
                    placeholder="Paste your transaction ID" 
                    onChange={(e) => onChange(e.target.value)}
                    style={{ color: "#3A3A3C !important" }}
                />
                <p className="dashboard-row-item-inner-input-message" style={{ textAlign: statusTransaction !== false || statusTransaction !== true ? "center" : ""}}>
                    {
                        statusTransaction === true ? 
                            <span style={{color: "#2ecd99"}} className='pay-plus-error'> Transaction has been successfully verified! Enter trading balance in Dashboard page for new period to start new period</span>
                        :
                            null
                    }
                    {
                        statusTransaction === false ? 
                            <span className='pay-plus-error'>Something went wrong with your transaction, try to enter transaction ID again or contact our <a style={{color: "blue"}} href="https://t.me/Skyrex_Support">&nbsp;support&nbsp;</a> to proceed further</span>
                        :
                            null
                    }
                </p>
                {
                    statusTransaction === true || statusTransaction === false  ?
                    <><div style={{ paddingTop: window.innerWidth < 427 ? 10 : 0}}/><br /></> : null
                }
            </div>

            <div className="pay-one-btn">
                <div className={input && fetching === false && statusTransaction ? "dashboard-btn active" : "dashboard-btn"} onClick={() => Send()}>
                    Send&nbsp;<LoadAnimate status={fetching}/>
                </div>
            </div>
        </FabeCont>
    )   
}