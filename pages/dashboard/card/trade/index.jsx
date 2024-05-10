import { useDispatch } from 'react-redux'
import { set_url_params_links } from "../../../../_dispatch/menu"

import { GraphCircle } from "../../../../components/graphCircle"

export const Trade = ({ active, tradeSuccsess, tradeAmount }) => {
    const dispatch = useDispatch()

    return (
        <div className={`dashboard-row-item dashboard-trades ${active}`}>
            <p className="dashboard-row-item-title">
                Trades
            </p>
            <p className="dashboard-row-item-slogan">
                {tradeAmount}
            </p>
            <div className='dashboard_net_graph_cont'>
                <GraphCircle num={tradeSuccsess}  color={active === "active" ? "white" : "url(#colorUv1)"} mini="+"/>
            </div>
            <div className="dashboard-row-item-play" onClick={() => dispatch(set_url_params_links(1))}>
                <div className="dashboard-row-item-play-title">
                    <p>
                        History
                    </p>
                </div>
                <div className="dashboard-row-item-play-circle">
                    <img src="https://skyrex.io/img/rifghr-white-small-arrow.svg" alt="" />
                    <img src="https://skyrex.io/img/right-green-small-arrow.svg" alt="" />
                </div>
            </div>
        </div>          
    )
}