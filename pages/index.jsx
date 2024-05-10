import { useSelector } from "react-redux"

import { Layout } from "./layout"

import { Dashboard } from "./dashboard"
import { Exchange } from "./exchange"
import { Traiding } from "./traiding"

export function RoutesApp() {
    const index = useSelector(state => state.global.url.index)

    return (
        <Layout>
            {
                index === 0 ? <Dashboard /> : null
            }
            {
                index === 1 ? <Traiding /> : null
            }
            {
                index === 2 ? <Exchange /> : null
            }
        </Layout>
    )
}