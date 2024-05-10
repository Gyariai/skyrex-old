import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FabeCont, LoadAnimate } from '../../../../lib/fabe'
import { delete_account } from "../../../../axios/user"

import { get_trade_user } from "../../../../axios/table"
import { getuserdata } from "../../../../axios/user"

import { set_table_data } from "../../../../_dispatch/table"
import { set_user_data } from "../../../../_dispatch/user"

export const PopDelete = ({ close, status, Cancel, setBlock, uuid }) => {
    const [ fetching, setFetching] = useState(false)
    const userdata = useSelector(state => state.userdata)
    const url = useSelector(state => state.global.url)

    const dispatch = useDispatch()

    const deleteAccount = async () => {
        setFetching(true)
        await delete_account(uuid)

        const result = await getuserdata(url.key)

        if(result) {
            dispatch(set_user_data(result))
        }

        const trades = await get_trade_user(userdata.user.email, userdata.currBalance)
        dispatch(set_table_data(trades))

        setBlock()
        Cancel()
        setFetching(false)
        close()
    }

    const closePop = () => {
        Cancel()
        close()
    }
    
    return (
        <FabeCont 
            className={"change-password pay-two mod border-red"}
            status={status}
        >
            <p className="pay-one-title">Are you sure you want to delete your exchange account?</p>
            <p className="pay-one-slogan">It will stop all active deals and new deals will not be opened in your account. If you need to update an expired API keys without switching to other exchange, use EDIT button instead of DELETE</p>
            <div style={{display: 'flex'}}>
                <div className="exchange-row-sub" >
                    <div  onClick={() => closePop()} className="dashboard-btn">Cancel</div>
                </div>
                <div style={{padding: 10}}/>
                <div className="exchange-row-sub">
                    <div onClick={() => deleteAccount()}className="dashboard-btn" style={{ background: "red" }}>{"Delete"}&nbsp;{<LoadAnimate status={fetching}/>}</div>
                </div>
            </div>
        </FabeCont>
    )
}