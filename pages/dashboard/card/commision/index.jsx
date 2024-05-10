import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"

import { formatNumber } from '../../../../Action/number'
import { CommisionPop } from "./popup/commision"
import { PopMinus } from "./popup/popMinus"
import { PopPlus } from "./popup/popPlus"

import { sortBalanceSession } from "../../../../Action/balance"


import { set_table_session_result } from "../../../../_dispatch/table"
import { session_result } from '../../../../axios/user'

export const Commision = ({ active, watermark, lvlComm, high_watermark }) => {
    const dispatch = useDispatch()
    const account = useSelector(state => state.userdata.user.account)
    const email = useSelector(state => state.userdata.user.email)

    const results = useSelector(state => state.table.results)

    const [ popComm, setPopComm ] = useState(false)
    const [ popMius, setPopMinus ] = useState(false)
    const [ popPlus, setPopPlus ] = useState(false)

    const active_s = "dashboard-row-item-list-item active"
    const no_active = "dashboard-row-item-list-item"

    useEffect(() => {
        (async function Fetch() {
            const res = await session_result(email)

            
            dispatch(set_table_session_result(res))
        })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[email])

    const Open = () => {
        const tans = sortBalanceSession(results)
        const tansaction = tans[tans.length - 1]
    
        if(tansaction.comm) {
            setPopPlus(true)
        } else {
            setPopMinus(true)
        }
    }
    const [ once, setOnce ] = useState(true)
    useEffect(() => {
        if(account === 5 && !!results && !!results.length && once) {
            const tans = sortBalanceSession(results)
            const tansaction = tans[tans.length - 1]
        
            setOnce(false)
            if(tansaction.comm) {
                setPopPlus(true)
            } else {
                setPopMinus(true)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, results])


    return (
        <>
        <CommisionPop popComm={popComm} setPopComm={setPopComm}/>
        <PopMinus popMius={popMius} setPopMinus={setPopMinus}/>
        <PopPlus popPlus={popPlus} setPopPlus={setPopPlus} watermark={watermark}/>
        <div className={`dashboard-row-item dashboard-commission ${active}`}>
            <div className="dashboard-mob-row">
                <p className="dashboard-row-item-title">
                    Commission
                </p>

                <p className="dashboard-row-item-slogan">
                    {formatNumber(watermark.toFixed(2))}&nbsp;USDT
                </p>
               
            </div>
            {
                high_watermark <= 0 ? null :
                <div className='water-mark'>
                    Hight-water mark:{" "}<span className='water-mark-red'>{`- ${formatNumber(high_watermark)} usdt`}</span>
                </div>
            }
            
            
            <div className="dashboard-row-item-list">
                <div className={lvlComm === 1 ? active_s : no_active}>
                    <div className="dashboard-row-item-list-item-title">
                        <p>
                            LVL 1
                        </p>
                    </div>
                    <div className="dashboard-row-item-list-item-line" style={{width: "56%"}}></div>
                    <div className="dashboard-row-item-list-title">
                        <p>
                            40%
                        </p>
                    </div>
                </div>
                <div className={lvlComm === 2 ? active_s : no_active}>
                    <div className="dashboard-row-item-list-item-title">
                        <p>
                            LVL 2
                        </p>
                    </div>
                    <div className="dashboard-row-item-list-item-line" style={{width: "50%"}}></div>
                    <div className="dashboard-row-item-list-title">
                        <p>
                            35%
                        </p>
                    </div>
                </div>
                <div className={lvlComm === 3 ? active_s : no_active}>
                    <div className="dashboard-row-item-list-item-title">
                        <p>
                            LVL 3
                        </p>
                    </div>
                    <div className="dashboard-row-item-list-item-line" style={{width: "40%"}}></div>
                    <div className="dashboard-row-item-list-title">
                        <p>
                            30%
                        </p>
                    </div>
                </div>
                <div className={lvlComm === 4 ? active_s : no_active}>
                    <div className="dashboard-row-item-list-item-title">
                        <p>
                            LVL 4
                        </p>
                    </div>
                    <div className="dashboard-row-item-list-item-line" style={{width: "34%"}}></div>
                    <div className="dashboard-row-item-list-title">
                        <p>
                            25%
                        </p>
                    </div>
                </div>
            </div>
            <div className="dashboard-row-item-play mod-btn" data-mod="#commissions" onClick={() => setPopComm(true)}>
                <div className="dashboard-row-item-play-title">
                    <p>
                        My commissions
                    </p>
                </div>
                <div className="dashboard-row-item-play-circle">
                    <img src="https://skyrex.io//img/rifghr-white-small-arrow.svg" alt="" />
                    <img src="https://skyrex.io//img/right-green-small-arrow.svg" alt="" />
                </div>
            </div>
            {
                account === 5 ?
                    <div onClick={() => Open()} className="dashboard-btn mod-btn" data-mod="#pay-two" >
                        <p>
                            Pay commission
                        </p>
                    </div>
                :
                    null
            }
            
        </div> 
        </>       
    )
}