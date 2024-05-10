import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FabeCont } from '../../../lib/fabe';
import { UTC } from '../setting'

import { set_select } from '../../../_dispatch/menu'

export const Select = () => {
    const [ active, setActive ] = useState(false)
 
    const { select_menu_utc } = useSelector(state => state.global)
    const dispatch = useDispatch()

    const Click = (value) => {
        setActive(!active)
        dispatch(set_select(value))
    }

    return (
        <div className="account-content-inner">
            <p className="account-content-text">
                Local time
            </p>
            <div className="account-content-select " onClick={() => setActive(!active)}>
                <div className={"account-content-select-arrow " + (active ? "active" : "")}>
                    <img src="img/down-white-arrow.svg" alt="" />
                </div>
                <div className="account-content-select-header">
                    <div className="account-content-select-item">
                        <p>{select_menu_utc.label}</p>
                    </div>
                </div>
                <FabeCont className="account-content-select-footer" status={active} close={() => setActive(!active)}>
                    {
                        UTC.map((v, i) => {
                            return (
                                <div 
                                    key={i} 
                                    className="account-content-select-item"
                                    onClick={() => Click(v)}
                                >
                                    <p>{v.label}</p>
                                </div>
                            )
                        })
                    }
                </FabeCont>
            </div>
        </div>
    )
}
