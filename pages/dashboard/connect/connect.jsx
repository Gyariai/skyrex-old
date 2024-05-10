import { useSelector, useDispatch } from 'react-redux'

import { set_connect_global, set_url_params_links } from "../../../_dispatch/menu"

import { FabeCont } from '../../../lib/fabe'

export const Connect = ({ value }) => {
    const dispatch = useDispatch()
    const { user_id } = useSelector(state => state.userdata.user)
    const statusPop = useSelector(state => state.global[value])

    const close = () =>  dispatch(set_connect_global(value))

    const clickNow = () => {

        if(value === "connectGlobal") {
            dispatch(set_url_params_links(2))
            close()
        } else {
            window.location.replace("https://skyrex.io/login/");
        }
  
    }

    let status = false 

    if(value === "connectGlobal") {
        status = !!user_id === false
    } else {
        status = true
    }
    

    return (
        <FabeCont className="change-password mod dashboard-first-modal" status={status && statusPop} close={() => close()}>
            <div className="mod-close" onClick={() => close()} style={{cursor: "pointer"}}>
                <img src="https://skyrex.io/img/mod-close.svg" alt=""/>
            </div>
            <p className="dashboard-first-modal-title">
                Welcome to Skyrex.io! <br/> Create new API keys with trading permissions to start
            </p>
            <div className="dashboard-first-modal-row">
                <div className="dashboard-first-modal-inner">
                    <div className="dashboard-first-modal-graph"
                        style={{ display: 'flex', justifyContent: 'center', border: "2px solid #2ECD99", padding: 10, borderRadius: 10 }}
                    >
                        <img src="https://skyrex.io/img/222.svg" alt="" style={{width: 100, height: 100}}/>
                    </div>
                    <div
                        onClick={() => clickNow()}
                        className="dashboard-first-modal-btn-one"
                        style={{cursor: "pointer"}}
                    >
                        Connect now
                    </div>
                    <p className="dashboard-first-modal-slogan semi-bold">
                        Connect your exchange to start trading
                    </p>
                </div>
                <div className="dashboard-first-modal-inner">
                    <div className="dashboard-first-modal-graph"
                        style={{ display: 'flex', justifyContent: 'center', border: "2px solid black", padding: 10, borderRadius: 10 }}
                    >
                        <img src="https://skyrex.io/img/111.svg" alt="" style={{width: 100}}/>
                    </div>
                    <div 
                        onClick={() => close()}
                        className="dashboard-first-modal-btn-two"
                        style={{cursor: "pointer"}}
                    >
                        Connect later
                    </div>
                    <p className="dashboard-first-modal-slogan">
                        Skip connecting an exchange. You can connect it once you are ready to start trading period in exchange account page
                    </p>
                </div>
            </div>
        </FabeCont>
    )
}