
import { data_no } from '../../nodata'

import { formatNumber } from "../../../../Action/number"
import { AreaChart, Area, YAxis, CartesianGrid } from 'recharts';

export const Income = ({ active, income, profitPer }) => {

    

    return (
        <div className={`dashboard-row-item dashboard-net ${active}`}>
            <p className="dashboard-row-item-title">
            Net income
            </p>
            <p className="dashboard-row-item-slogan">
                {formatNumber(income)}
                &nbsp;USDT
            </p>
            
            
            <div className='net-graph-cont'>
                <AreaChart  
                    width={window.innerWidth < 878 ? 200 : 280}
                    height={window.innerWidth < 878 ? 50 : 80}
                    data={data_no}
                    margin={{
                        right: 60,
                        bottom: 10
                    }}
                >   
                    <YAxis
                        domain={['auto', 'auto']}
                        allowDecimals={false}
                        axisLine={false} 
                        tickLine={false}
                        tick={false}
                
                    />
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="0%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="pv" stroke={active === "active" ? "white" : "#2ECD99"} fill="url(#colorUv)"  strokeWidth={2}/>
                    <CartesianGrid vertical={false} strokeDasharray="2 4"  horizontalPoints={[window.innerWidth < 878 ? 50 : 80]} stroke={"rgba(58, 58, 60, 0.7)"}/>
                </AreaChart>
      
            </div>

            <div className="dashboard-row-item-circle">
                <p>
                    <span>{profitPer.toFixed(2)}</span>%
                </p>
            </div>
        </div>            
    )
}