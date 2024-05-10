import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Graph } from "./graph"

export const GraphTitle = () => {
    const { theme } = useSelector((state) => state.global)
    const trades = useSelector((state) => state.table.trades)

    const [ graph_link, setGraphLink ] = useState("period")
    const [ type, setType ] = useState("usdt")

    return (
        <div 
            className="graph_dash_consteiner"
            style={{ background: theme === "light" ? "white" : "#1F1F1F" }}
        >   
            <div className="graph_dash_consteiner_flex">
                <div className="graph_dash_consteiner_title">
                    <p 
                        className="graph_dash_title"
                        style={{ color: theme === "light" ? "#1F1F1F" : "white" }}
                    >Return by</p>
                    <p
                        onClick={() => setGraphLink("day")}
                        className={"graph_dash_link " + (graph_link === "day" ? "graph_dash_title_active" : "")}
                        style={{ color: theme === "light" ? "#1F1F1F" : "#F6F6F6" }}
                    >Day
                    </p>
                    <p
                        onClick={() => setGraphLink("asset")}
                        className={"graph_dash_link " + (graph_link === "asset" ? "graph_dash_title_active" : "")}
                        style={{ color: theme === "light" ? "#1F1F1F" : "#F6F6F6" }}
                    >Asset
                    </p>
                    <p
                        onClick={() => setGraphLink("period")}
                        className={"graph_dash_link " + (graph_link === "period" ? "graph_dash_title_active" : "")}
                        style={{ color: theme === "light" ? "#1F1F1F" : "#F6F6F6" }}
                    >Period
                    </p>
                </div>
                <div>
                    <div 
                        className="graph_dash_switch_conteiner"
                        style={{ background: theme === "light" ? "#F6F6F6" : "#3A3A3C" }}
                    >
                        <p
                            onClick={() => setType("usdt")}
                            className={type === "usdt" ? "graph_dash_switch_actvie": "graph_dash_switch_actvie_no"}
                        >USDT</p>
                        <p
                            onClick={() => setType("%")}
                            className={type === "%" ? "graph_dash_switch_actvie": "graph_dash_switch_actvie_no"}
                        >%</p>
                    </div>
                </div>
            </div>
            <Graph graph_link={graph_link} type={type} trades={trades}/>
        </div>
    )
}