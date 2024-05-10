import { useDispatch } from 'react-redux'
import { account_web } from "../../../../_dispatch/menu"

export const Account = () => {
    const dispatch = useDispatch()
    
    return (
        <div className="account-header" onClick={() => dispatch(account_web())}>
            <div className="account-header-icon">
                <img src="https://skyrex.io//img/account.svg" alt="" />
            </div>
            <div className="account-header-text">
                <p>
                    Account
                </p>
            </div>
            <div className="account-header-arrow">
                <img src="https://skyrex.io//img/down-black-arrow.svg" alt="" />
                <img src="https://skyrex.io//img/down-white-arrow.svg" alt="" />
            </div>
        </div>
    )
}