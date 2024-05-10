import { useDispatch } from 'react-redux'
import { dashboard_modile, account_modile } from "../../../../_dispatch/menu"

export const Bars = () => {
    const dispatch = useDispatch()
    return (
        <div className="header-bars" onClick={() => dispatch(dashboard_modile())}>
            <img src="https://skyrex.io//img/bars.svg" alt="" />
        </div>
    )
}

export const Account = () => {
    const dispatch = useDispatch()
    return (
        <div className="account-header" onClick={() => dispatch(account_modile())}>
            <div className="account-header-icon">
                <img src="https://skyrex.io//img/account.svg" alt="" />
            </div>
        </div>
    )
}