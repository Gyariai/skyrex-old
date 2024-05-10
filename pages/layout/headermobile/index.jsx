import { Logo } from './components/logo'
import { Bars, Account } from './components/icon'
import { AccountMenu } from "./account"
import { DashboardMenu } from './dashboard'


export const HeaderMobile = () => {
    return (
        <>
            <div className="header">
                <div className="header-row">
                    <Logo />
                    <Bars />
                    <div className="account">
                        <Account />
                        <AccountMenu />
                    </div>
                </div>
                <DashboardMenu />
            </div>
        </>
    )
}