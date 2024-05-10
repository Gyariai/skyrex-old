import { useSelector } from "react-redux"

import { FabeCont } from "../../../../lib/fabe"
import { Links } from '../../components/link'
import { Select } from "../../components/select"
import { Theme } from "../../components/theme"
import { TwoFA } from "../../components/2fa"

import { urlSearchParams } from "../../../../Action/store/url"

export const AccountMenu = () => {
    const account_mobile = useSelector(state => state.global.account_mobile)
    const email = useSelector(state => state.userdata.user.email)
  
    return (
        <>
        <FabeCont className={"account-content block"} status={account_mobile} back={"no"}>

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
                    <Theme />
                </div>
                <TwoFA />
                <Links/>
                <div className="account-content-inner">
                        <a href={`https://skyrex.io/login/${urlSearchParams().key ? "logout" : ""}`} className="account-btn">
                            {urlSearchParams().key ? "Log out" : "Sing up"}
                        </a>
                </div>
        </FabeCont>
        </>
    )
}