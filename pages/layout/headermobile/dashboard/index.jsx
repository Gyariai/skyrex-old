import { useSelector } from "react-redux"
import { FabeCont } from "../../../../lib/fabe"

import { LinkMobile } from './link'
import { Info } from './info'
import { Seti } from './seti'

export const DashboardMenu = () => {
    const { dashboard_mobile } = useSelector(state => state.global)

    return (
        <FabeCont className={"header-menu block"} status={dashboard_mobile} back={"no"}>
            <LinkMobile />
            <Info />
            <Seti />
        </FabeCont>
    )
}