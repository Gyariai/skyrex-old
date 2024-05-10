import { useSelector, useDispatch } from "react-redux"
import { FabeCont } from '../../../../../lib/fabe'

import { continue_traiding } from "../../../../../axios/user"
import { getuserdata } from "../../../../../axios/user"
import { set_user_data } from "../../../../../_dispatch/user"

export const PopMinus = ({ popMius, setPopMinus }) => {
    const dispatch = useDispatch()
    
    const email = useSelector(state => state.userdata.user.email)
    const url = useSelector(state => state.global.url)

    const Send = async () => {
        await continue_traiding(email)
        

        const result = await getuserdata(url.key)
        if(result) {
            dispatch(set_user_data(result))
        }

        setPopMinus(false)
    }

    return (
        <FabeCont className="change-password pay-one mod" status={popMius} close={() => setPopMinus(false)}>
            <div className="mod-close" onClick={() => setPopMinus(false)}>
                <img src="https://skyrex.io/img/mod-close.svg" alt=""/>
            </div>
            <p className="pay-one-title">
                Trading period finished with a negative result thus there is no profit sharing commission
            </p>
            <p className="pay-one-slogan">
                Skyrex follows high watermark trading method losses of current session will be added to results of the next trading period
            </p>
            <div className="pay-one-icon" style={{ display: 'flex', justifyContent: "center" }}>
                <img src="https://skyrex.io/img/commission icon.svg" alt=""/>
            </div>
            <div className="pay-one-btn" onClick={() => Send()}>
                <div className="dashboard-btn">Continue</div>
            </div>
        </FabeCont>
    )
}