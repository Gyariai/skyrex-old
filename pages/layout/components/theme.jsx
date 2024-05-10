import { useDispatch, useSelector } from "react-redux"

import { Set_theme } from "../../../_dispatch/menu"

export const Theme = ({ acc_text }) => {
    const theme = useSelector(state => state.global.theme)
    const dispatch = useDispatch()

    return (
        <div className="account-content-mode">

            <div
                onClick={() => dispatch(Set_theme("light"))}
                className={(theme === "light" ? "account-content-mode-item light-mode active" : "account-content-mode-item dark-mode")}
            >
                <div className="account-content-mode-item-icon">
                    <img src="/img/sunny.svg" alt="" />
                    <img src="/img/sunny-active.svg" alt="" />
                </div>
                <div className="account-content-mode-item-title">
                    <p>
                        Light
                    </p>
                </div>
            </div>

            <div
                onClick={() => dispatch(Set_theme("dark"))}
                className={(theme === "dark" ? "account-content-mode-item light-mode active" : "account-content-mode-item dark-mode")}
            >
                <div className="account-content-mode-item-icon">
                    <img src="/img/moon.svg" alt="" />
                    <img src="/img/moon-active.svg" alt="" />
                </div>
                <div className="account-content-mode-item-title">
                    <p>
                        Dark
                    </p>
                </div>
            </div>
            
        </div>
    )
}