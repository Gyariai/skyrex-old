import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

export const GraphCircle= ({ num, mini, color = false }) => {
    const d = Number(isNaN(num) ? 0 : num.toFixed(2))

    const data = [
        { name: 'Group A', value: d },
        { name: 'Group B', value: 100 - d },
    ];

    let i = 52
    let o = 55
    let h = 120
    if(mini === "+" && window.innerWidth < 993) {
        i = 42
        o = 45
        h = 90
    }

    return (
        <ResponsiveContainer height={h}>              
            <PieChart>
            <defs>
                <linearGradient id="colorUv1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="40%" stopColor="#2ECD99" stopOpacity={1}/>
                </linearGradient>
            </defs>
            <defs>
                <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="40%" stopColor="gray" stopOpacity={0.3}/>
                </linearGradient>
            </defs>
                <Pie
                    data={data}
                    innerRadius={i}
                    outerRadius={o}
                    paddingAngle={1}
                    dataKey="value"
                    stroke='none'
                    activeIndex={0}
                    activeShape={renderActiveShape}
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ?  color ===  false ? "url(#colorUv1)"  : color : "url(#colorUv2)"} />
                    ))}
                
                </Pie>
            </PieChart>
        </ResponsiveContainer>      
    )
}

const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, percent } = props;

    return (
      <g>
        <text x={cx} y={cy} dy={5} textAnchor="middle" fill={percent === 0 ? "grey"  : fill} style={{ fontSize: 14, fontWeight: 600 }}>
            {(percent * 100).toFixed()}%
        </text>
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
        />
      </g>
    );
  };