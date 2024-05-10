import { useSelector } from 'react-redux'

import { Export } from "./export"
import { formatNumber } from '../../../Action/number'
import { get_statistic } from '../../../Action/getdatamoth'
import { checkActiveMonth, getCurrBalance } from '../../../Action/balance'

import { GraphCircle } from '../../../components/graphCircle'

export const Statistic = ({ active_cell }) => {
    const { currBalance, balance } = useSelector(state => state.userdata)

    let active_stat = checkActiveMonth(currBalance, balance)

    const { active, fund, unrelise } = get_statistic(active_cell, active_stat)

    const usage = (fund / (getCurrBalance({ currBalance, balance }) / 100)).toFixed(0)

    return (
        <>
            <Export />
            <div className="trading-inner">
                <div className="trading-inner-item">
                    <p className="trading-inner-title">
                        Active deals statistic
                    </p>
                    <div className="trading-inner-list">
                        <div className="trading-inner-list-item">
                            <div className="trading-inner-list-item-title">
                                <p>
                                    Active trades
                                </p>
                            </div>
                            <div className="trading-inner-list-item-line">
                            </div>
                            <div className="trading-inner-list-item-numbers">
                                <p>
                                    {active}
                                </p>
                            </div>
                        </div>
                        <div className="trading-inner-list-item">
                            <div className="trading-inner-list-item-title">
                                <p>
                                    Funds in trades
                                </p>
                            </div>
                            <div className="trading-inner-list-item-line">
                            </div>
                            <div className="trading-inner-list-item-numbers">
                                <p>
                                    ${formatNumber(Number(fund).toFixed())}
                                </p>
                            </div>
                        </div>
                        <div className="trading-inner-list-item">
                            <div className="trading-inner-list-item-title">
                                <p>
                                    Unrealised P&L
                                </p>
                            </div>
                            <div className="trading-inner-list-item-line">
                            </div>
                            <div className={"trading-inner-list-item-numbers " + (Number(unrelise) >= 0 ? Number(unrelise) === 0 ? "" : "green" : "red")}>
                                <p>
                                    ${formatNumber(Number(unrelise).toFixed(2))}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="trading-inner-item">
                    <p className="trading-inner-title">
                        Portfolio in usage
                    </p>
                    <GraphCircle num={Number(usage)} mini={"+"}/>
                </div>
            </div>
        </>
    )
}
