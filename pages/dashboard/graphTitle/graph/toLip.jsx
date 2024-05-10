import { formatNumber } from '../../../../Action/number'

export const Tolip = ({ payload, theme, type }) => {
    if(payload[0]) {
        console.log(type)
        return (
            <div style={{ positiom: "relatie" }}>
                <div className="tolip-conteiner" style={{ background: theme === "light" ? "#F5F5F5" : "#373737"}}>
                    <div className='tolip-conteiner-text_1'>
                        {
                            payload[0].payload?.date ? payload[0].payload?.date :payload[0].payload?.name
                        }
                    </div>
                    
                    <div className="tolip-conteiner-text_2">
                        {type.type === "usdt" ? "$" : "%"} {formatNumber(payload[0].value.toFixed(2))}
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
   
}


const Per = (data) => {
    return Number(data) > 1 || Number(data) < -1 ? Number(data).toFixed() : Number(++data).toFixed(2)
}