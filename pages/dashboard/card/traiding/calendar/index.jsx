import { useState } from 'react'

import { useSelector } from "react-redux"

import { monthText } from "./month"
import { Menu } from './menu'

export const Calendar = () => {
    const currentDate = useSelector(state => state.userdata.currBalance)

    const [ statusPopCalndar, setStatusPopCalendar ] = useState(false)

    const set = (status) => {
        setStatusPopCalendar(status)
    }
    return (
        <>
        <Menu statusPopCalndar={statusPopCalndar} setStatusPopCalendar={set}/>
        
        <div className="dashboard-row-item-calendar mod-btn" data-mod="#calendar">
            <div
                className="dashboard-row-item-select-header"
                onClick={() => set(true)}
            >
                <div className="dashboard-row-item-select-item">
                    <p>
                        <span className="dashboard-row-item-select-item-month">
                            {monthText[currentDate.month]}
                        </span>{" "}
                        <span className="dashboard-row-item-select-item-years">
                            {currentDate.year}
                        </span>
                    </p>
                </div>
                <div 
                    className={`dashboard-row-item-select-arrow  ${statusPopCalndar ? "active" : ""}`}
                >
                    <img src="https://skyrex.io/img/down-small-black-arrow.svg" alt="" />
                    <img src="https://skyrex.io/img/down-small-white-arrow.svg" alt="" />
                </div>
            </div>
        </div>    
        </>     
    )
}