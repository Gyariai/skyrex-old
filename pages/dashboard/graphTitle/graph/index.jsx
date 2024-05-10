import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { formatNumber } from '../../../../Action/number'

import { noDataLine, noDataDay, noDataAsset } from '../../nodata'
import { getDataDay, getDataAsset, GetDataPeriod } from "../../../../Action/graph"
import { getPersent } from "../../../../Action/persent"
import { getCurrBalance } from "../../../../Action/balance"

import { Tolip } from "./toLip"

export const Graph = ({ graph_link, type, trades }) => {
    let [dataBar, setDataBar] = useState([])

    const theme =  getCurrBalance(useSelector(state => state.global.theme))
    const balance =  getCurrBalance(useSelector(state => state.userdata))
    const mounthCurr =  getCurrBalance(useSelector(state => state.userdata.currBalance))
    
    useEffect(() => {
    
        if(trades.length === 0) {
            let res = noDataLine()
            if(graph_link === "day") {
                res = noDataDay(type, balance)
            }
            if(graph_link === "asset") {
                res = noDataAsset(type, balance)
            }
            if(graph_link === "period") {
                res = noDataLine(type, balance)
            }
            setDataBar(res)
        } else {
            let res = []
            if(graph_link === "day") {
                res = getDataDay(trades)
            }

            if(graph_link === "asset") {
                res = getDataAsset(trades)
            }

            if(graph_link === "period") {
                res = GetDataPeriod(trades, balance)
            }

            if(type === "%") {
                res = getPersent(res, balance)
            }

            setDataBar(res)

        }
   
      
    }, [graph_link, type, trades, balance])
   
    return (
        <div>
        <ResponsiveContainer height={350}>
            {
                graph_link === "day" || graph_link === 'asset' ? 
                    <BarChart
                        height={300}
                        data={dataBar}
                        margin={{
                            top: 50,
                            left: 0,
                            bottom: 50,
                        }}
                    >
                    <CartesianGrid stroke="#C4CAC8" vertical={false}  strokeDasharray="2 4" width="95%" height={400} />
                    <XAxis 
                        dataKey="name"  
                        stroke="#8E8E8E"
                        tickLine={false}
                        minTickGap={-100}
                        axisLine={false}
                        textAnchor="end"
                        tick={{fontSize: 12}}
                        padding={{ right: 20 }}
                        interval="preserveStart"
                        angle={graph_link === "day" ? 0 : -45}
                        dx={graph_link === "day" ? 5 : 0}
               
                    />
                    <YAxis
                        domain={['auto', 'auto']}
                        interval={"Number"}
                        dataKey="pv"
                        stroke="#8E8E8E"
                        axisLine={false} 
                        tickLine={false} 
                        width={window.innerWidth < 993 ? 50 : 80}
                        minTickGap={6}
                        tickCount={6}
                        tick={{fontSize: 12}}
                        tickFormatter={(label) =>  type === "%" ? `${formatNumber(label)} %` : `$ ${formatNumber(label)}`}
                    />
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2ECD99" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#2ECD99" stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                    <Tooltip cursor={false} content={<Tolip mounth={mounthCurr} type={{ graph_link, type }} theme={theme}/>}/>
                    <Bar 
                        dataKey="pv"
                        fill={"#2ECD99"}
                        radius={[4, 4, 0, 0]}
                        
                        barSize={10}
                    />
                </BarChart>
                :
                <AreaChart
                    height={300}
                    data={dataBar}
                    margin={{
                        top: 50,
                        left: 0,
                        bottom: 50,
                    }}
                >
                <CartesianGrid stroke="#C4CAC8" vertical={false}  strokeDasharray="2 4" width="%" />
                <XAxis 
                    dataKey="name"  
                    stroke="#8E8E8E"
                    tickLine={false}
                    minTickGap={10}
                    axisLine={false}
                    textAnchor="end"
                    tick={{fontSize: 12}}
                    interval="preserveEnd"
                    dx={10}
                    padding={{ right: 20 }}
                />
                <YAxis
                    domain={['auto', 'auto']}
                    interval={"Number"}
                    dataKey="pv"
                    stroke="#8E8E8E"
                    axisLine={false} 
                    tickLine={false} 
                    width={window.innerWidth < 993 ? 50 : 80}
                    minTickGap={6}
                    tickCount={6}
                    tick={{fontSize: 12}}
                    tickFormatter={(label) => type === "%" ? `${formatNumber(label)} %` : `$ ${formatNumber(label)}` }
                />
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2ECD99" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2ECD99" stopOpacity={0.1}/>
                    </linearGradient>
                </defs>
                
                <Area type="monotone" dataKey="pv" stroke={"#2ECD99"} strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
                <Tooltip cursor={false} content={<Tolip mounth={mounthCurr} type={{ graph_link, type }} theme={theme}/>}/>
            </AreaChart>
            }
        </ResponsiveContainer>
        </div>      
    )
}