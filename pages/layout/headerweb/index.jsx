import { useSelector, useDispatch } from "react-redux"

import { TitleWeb } from "./components/title"
import { FabeCont } from "../../../lib/fabe"

import { Account } from "./components/account"
import { Select } from "../components/select"
import { Theme } from "../components/theme"
import { Links } from "../components/link"
import { TwoFA } from "../components/2fa"

import { account_web } from "../../../_dispatch/menu"

import { urlSearchParams } from "../../../Action/store/url"

export const HeaderWeb = () => {
    const dispatch = useDispatch()

    const email = useSelector(state => state.userdata.user.email)
    const index = useSelector(state => state.global.url.index)
    const account = useSelector(state => state.global.account_web)

    return (
        <>
        <div className="content-header">
            <TitleWeb index={Number(index)}/>
            <div className={account ? "account active" : "account"}>
                <Account />
                <FabeCont className="account-content block" status={account} close={() =>  dispatch(account_web())}>
                    <div className="account-content-inner">
                        <p className="account-content-text">
                            Login
                        </p>
                        <p className="account-content-title">
                            {email}
                        </p>
                    </div>
                    <Select />
                    <div className="account-content-inner">
                        <p className="account-content-text">
                            Mode
                        </p>
                    </div>
                    <Theme />
                    <TwoFA />
                    <Links/>
                    <div className="account-content-inner">
                        <a href={`https://skyrex.io/login/${urlSearchParams().key ? "logout" : ""}`} className="account-btn">
                            {urlSearchParams().key ? "Log out" : "Sing up"}
                        </a>
                    </div>
                   
                </FabeCont>
            </div>
        </div>
        </>
    )
}