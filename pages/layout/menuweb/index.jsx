import { Logo } from './components/logo'
import { Links } from './components/links'
import { Info } from './components/info'
import { Seti } from './components/seti'

export const MenuWeb = () => {
    return (
        <>
            <div className="shadow"></div>
            <div className="menu-block">
                <Logo />
                <Links />
                <Info />
                <Seti />
            </div>
        </>
    )
}