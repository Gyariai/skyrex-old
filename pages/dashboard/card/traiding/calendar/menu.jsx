import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { set_confirm_calendar } from "../../../../../_dispatch/user"

import { getBalanceYear, getBalanceMonth } from "../../../../../Action/balance"

import { FabeCont } from '../../../../../lib/fabe'
import { monthText } from "./month"

export const Menu = ({ statusPopCalndar, setStatusPopCalendar }) => {
    const currentDate = useSelector(state => state.userdata.currBalance)
    const balance = useSelector(state => state.userdata.balance)

    const [date, setDate] = useState(currentDate)

    const yearSw = (temp) => {
        const result = getBalanceYear(balance, date.year + temp)
        if(result) setDate(result)
    }

    const monthSw = (temp) => {
        const result = getBalanceMonth(balance, date.year, date.month + temp)
        if(result) setDate(result)
    }

    const Cancel = () => {
        setDate(currentDate)
        setStatusPopCalendar(false)
    }

    const dispatch = useDispatch()
    const Confirm = () => {
        dispatch(set_confirm_calendar(date))
        setStatusPopCalendar(false)
    }

    useEffect(() => {
        if(currentDate) setDate(currentDate)
    }, [currentDate])

    return (
        <FabeCont className="calendar mod block" status={statusPopCalndar} close={() =>  Cancel()}>
            <div className="calendar-block calendar-years">
                <div
                    className="calendar-block-arrow left-arrow"
                    onClick={() => yearSw(-1)}
                >
                    <img src="https://skyrex.io//img/left-white-arrow.svg" alt="" />
                </div>
                <div className="calendar-block-text">
                    {date.year}
                </div>
                <div
                    className="calendar-block-arrow right-arrow"
                    onClick={() => yearSw(1)}
                >
                    <img src="https://skyrex.io//img/right-white-arrow.svg" alt="" />
                </div>
            </div>
            <div className="calendar-block calendar-month">
                <div
                    className="calendar-block-arrow left-arrow"
                    onClick={() => monthSw(-1)}
                >
                    <img src="https://skyrex.io//img/left-white-arrow.svg" alt="" />
                </div>
                <div className="calendar-block-text">
                    <div className="calendar-block-text-item">
                        {monthText[date.month]}
                    </div>
                </div>
                <div
                    className="calendar-block-arrow right-arrow"
                    onClick={() => monthSw(1)}
                >
                    <img src="https://skyrex.io//img/right-white-arrow.svg" alt="" />
                </div>
            </div>
            <div className="calendar-footer">
                <div
                    className="calendar-close"
                    onClick={() =>  Cancel()}
                >
                    <p>
                        Cancel
                    </p>
                </div>
                <div
                    className="calendar-btn"
                    onClick={() =>  Confirm()}
                >
                    <p>
                        Continue
                    </p>
                </div>
            </div>
        </FabeCont>
    )
}
