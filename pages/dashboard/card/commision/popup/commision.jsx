import { useSelector } from 'react-redux'

import { FabeCont } from '../../../../../lib/fabe'
import { Table } from '../../../../../components/table'

export const CommisionPop = ({ setPopComm, popComm }) => {
    const { row_transaction } = useSelector(state => state.table)
    const transaction = useSelector(state => state.table.results)
    return (
        <FabeCont className="change-password commissions mod" status={popComm} close={() => setPopComm(false)}>
            <div className="mod-close" onClick={() => setPopComm(false)}>
                <img src="https://skyrex.io/img/mod-close.svg" alt="" />
            </div>
            <p className="commissions-title">Profit sharing commission percent depends on portfolio size and is paid only when a trading period is finished</p>
            <div className="commissions-block">
                <div className="commissions-block-title">
                    <p>
                        Level 1 - 40%
                    </p>
                </div>
                <div className="commissions-block-line trading-inner-list-item-line"></div>
                <div className="commissions-block-title">
                    <p>
                        from 5 000 USDT
                    </p>
                </div>
            </div>
            <div className="commissions-block">
                <div className="commissions-block-title">
                    <p>
                        Level 2 - 35%
                    </p>
                </div>
                <div className="commissions-block-line trading-inner-list-item-line"></div>
                <div className="commissions-block-title">
                    <p>
                        from 15 000 USDT
                    </p>
                </div>
            </div>
            <div className="commissions-block">
                <div className="commissions-block-title">
                    <p>
                        Level 3 - 30%
                    </p>
                </div>
                <div className="commissions-block-line trading-inner-list-item-line"></div>
                <div className="commissions-block-title">
                    <p>
                        from 35 000 USDT
                    </p>
                </div>
            </div>
            <div className="commissions-block">
                <div className="commissions-block-title">
                    <p>
                        Level 4 - 25%
                    </p>
                </div>
                <div className="commissions-block-line trading-inner-list-item-line"></div>
                <div className="commissions-block-title">
                    <p>
                        from 75 000 USDT
                    </p>
                </div>
            </div>
            <p className="commissions-title mt-40">
                Commission payments history
            </p>
            <Table pages={3} row_class="commissions-inner-row-col" rows={row_transaction} cell={!!transaction ? transaction : []} mobile={"none"} nodata_label={true}/>
        </FabeCont>
    )
}