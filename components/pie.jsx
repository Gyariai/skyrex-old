/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { VictoryPie } from "victory-pie";
import $ from 'jquery'

import { formatNumber } from '../Action/number'

export const GraphPie = ({ table }) => {
    const [ data, setDate ] = useState()
    const [ currLip , setCurrLip ] = useState()

    const [ token , setToken ] = useState(getCurrLip(table, "USDT"))
    
    useEffect(() => {
        if(currLip) {
            const result = getCurrLip(table, currLip)
            setToken(result)
        }
    }, [currLip])

    useEffect(() => {
        if(table.length) {
            setDate(SortPieXY(table))
        }
    }, [table])

    useEffect(() => {
        $(window.document).ready(function() {
            $(".exchange-block-diadram").mousemove(
                function(pos) {
                    $(".exchange-block-diadram-object").show();
                    $(".exchange-block-diadram-object").css('left', (pos.pageX - 60) + 'px').css('top', (pos.pageY - 140) + 'px');
                }
    
            ).mouseleave(function() {
                $(".exchange-block-diadram-object").hide();
            });
    
        });
    }, [null])

    return (
        <div className="exchange-block-diadram-container">
            <div className="exchange-block-diadram">
            <VictoryPie
                data={data}
                colorScale={[ '#1AB884', '#1DA87A', '#E2E2E2','#0088FE', '#00C49F', '#FFBB28', '#FF8042']}
                radius={300}
                events={[{
                    target: "data",
                    eventHandlers: {
                        onMouseEnter: () => {
                            return [{
                                target: "labels",
                                mutation: ({ text }) => {
                                    setCurrLip(text)
                                    return null
                                }
                            }];
                      }
                    }
                  }]}
            />
            </div>
            <div className="exchange-block-diadram-object">
                <p className="exchange-block-diadram-object-title">
                    {token.symbol} <span>{token.percentage} %</span>
                </p>
                <p className="exchange-block-diadram-object-slogan">
                    Amount
                </p>
                <p className="exchange-block-diadram-object-text">
                    {token.amount}
                </p>
                <p className="exchange-block-diadram-object-text">
                    ₿ {token.btc_value}
                </p>
                <p className="exchange-block-diadram-object-text" style={{paddingBottom: 5 }}>
                    $ {token.usd_value}
                </p>
            </div>
            <p className="exchange-block-diadram-container-text">
                <span>Total:</span> <i className="exchange-block-diadram-container-text-numbers">{formatNumber(total_$(table))}</i> USDT
            </p>
        </div>                 
    )
}

const SortPieXY = (table) => {
    const data = []
    table.forEach(v => {
        data.push({
            x: v.symbol,
            y: v.percentage
        })
    })

    return data
}

const getCurrLip = (table, name) => {
    let data = ""
    table.forEach(v => {
        if(v.symbol === name) data = v
    })

    return data
}

const total_$ = (data) => {
   
    if(data.length === 0) {
        return 0
    }
    let res = 0
    data.forEach(v => {
        if(v.percentage > 0) {
            res = res + Number(Number(v.usd_value).toFixed(2))
        }
    });

    return res.toFixed(2)
}