import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FabeCont } from '../../../lib/fabe'
import { set_form_value } from "../../../_dispatch/user"

export const Select  = ({ disable = true }) => {
    const dispatch = useDispatch()
    const [ status, setStatus ] = useState(false)

    const firstload = useSelector(state => state.global.firstload)
    const exchange = useSelector(state => state.userdata.user.exchange)

    const Click = (name) => {
        setStatus(false)
        dispatch(set_form_value("exchange", name))
    }

    useEffect(() => {
        if(!!exchange === false && !!firstload === false) {
            dispatch(set_form_value("exchange", "Binance"))
        }

    }, [dispatch, exchange, firstload])

    return (
        <div className={"exchange-select " + (status ? "active" : "")}>
            <div className="exchange-select-header" onClick={() => setStatus(!status)}>

                <div className="exchange-select-item">
                    <div className="exchange-select-item-title">
                        <p>
                            {GetActive(exchange, value)}
                        </p>
                    </div>
                </div>
            </div>
            {
                disable ? null :
                <FabeCont className="exchange-select-content" status={status} close={() => setStatus(false)}>
                    {
                        value.map((v, i) => {
                            if(v.index === exchange) {
                                return null
                            }
                            return (
                                <div 
                                    key={i} 
                                    className="exchange-select-item"
                                    onClick={() => Click(v.value)}
                                >
                                    <div className="exchange-select-item-title">
                                        <p>
                                            {v.index}
                                        </p>
                                    </div>
                                </div>  
                            )
                        })
                    }
                </FabeCont>
            }
           
        </div>                               
   )  
           
}

/**
 * 
                <div className="exchange-select-arrow">
                    <img src="/img/down-black-arrow.svg" alt="" />
                </div>
 */

const GetActive = (exchange, value) => {
    let result = "Binance"

    value.forEach(v => {
        if(v.value === exchange) {
            result = v.index
        }
    })
    return result
}

const value = [
    {
        index: "Binance",
        value: "Binance"
    },
    {
        index: "OKEx",
        value: "OKEx"
    },
    {
        index: "Bittrex",
        value: "Bittrex"
    },
    {
        index: "Coinbase Pro",
        value: "gdax"
    },
    {
        index: "Huobi Global",
        value: "Huobi"
    },
    {
        index: "KuCoin",
        value: "KuCoin"
    },
    {
        index: "Binance US",
        value: "Binance_us"
    },
    {
        index: "Bybit",
        value: "bybit_spot"
    },
    {
        index: "FTX US",
        value: "ftx_us"
    },
    {
        index: "Gate.io",
        value: "gate_io"
    },
    {
        index: "Gemini",
        value: "gemini"
    },
    {
        index: "Kraken",
        value: "kraken"
    },
]