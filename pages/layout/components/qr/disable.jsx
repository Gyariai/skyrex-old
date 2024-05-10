import { FabeCont } from '../../../../lib/fabe'

import { useState } from 'react'

import { useSelector } from 'react-redux'

import { tokenfadisable } from '../../../../axios/2fa'

import { str_fa } from './str_fa'

import { Err } from './err'

export const DisableQR = ({ status, close }) => {
    const email = useSelector(state => state.userdata.user.email)
    const [ token, setToken] = useState("")
    const [ auth, setAuth] = useState(false)
    const [ err, setErr] = useState(false)

    const onChange = (num) => {
        let n =  num.replace(/\s/g,'')
        
        if(!!n[n.length - 1] === false && Number(n) === 0) {
            setToken("")
        } else {
            // eslint-disable-next-line
            if(isNaN(Number(n[n.length - 1])) === false && n.length < 7 || Number(n) === 0) {
                setToken(n.slice(0, 6))
            }
        }
    }

    const Auth = async () => {
        const { status } = await tokenfadisable(email, token)

        if(status) {
            localStorage.setItem("token_fa","")
            setAuth(true)
            setErr(false)
        } else {
            setErr(true)
        }
    }

    const Rel = () => {
        window.location.reload()
    }

    return (
        <FabeCont className="change-password mod block position_block" status={status} close={() => close()}>
            <div className="mod-close" onClick={() => close()}>
                <img src="https://skyrex.io/img/mod-close.svg" alt="" />
            </div>
            {
                auth ?
                <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40.4585 47.0417C39.6739 46.2571 38.6097 45.8163 37.5001 45.8163C36.3905 45.8163 35.3264 46.2571 34.5418 47.0417C33.7572 47.8263 33.3164 48.8904 33.3164 50C33.3164 51.1096 33.7572 52.1737 34.5418 52.9583L47.0418 65.4583C47.4311 65.8445 47.8929 66.15 48.4005 66.3574C48.9082 66.5647 49.4518 66.6698 50.0001 66.6667C50.5705 66.6486 51.1311 66.5135 51.6472 66.2698C52.1633 66.0261 52.6237 65.679 53.0001 65.25L82.1668 31.9167C82.8402 31.0805 83.165 30.0167 83.0732 28.947C82.9815 27.8773 82.4804 26.8843 81.6744 26.175C80.8684 25.4658 79.8198 25.095 78.7471 25.14C77.6744 25.185 76.6605 25.6424 75.9168 26.4167L50.0001 56.4167L40.4585 47.0417Z" fill="#2ECD99" stroke="white" strokeWidth="5"/>
                        <path d="M87.5 45.8333C86.395 45.8333 85.3352 46.2723 84.5537 47.0537C83.7723 47.8351 83.3334 48.8949 83.3334 50C83.3334 58.8405 79.8215 67.319 73.5703 73.5702C67.319 79.8214 58.8406 83.3333 50 83.3333C43.4171 83.3303 36.9824 81.3782 31.5074 77.7231C26.0324 74.068 21.7622 68.8736 19.2354 62.7949C16.7085 56.7162 16.0381 50.0254 17.3087 43.5662C18.5793 37.107 21.734 31.1687 26.375 26.5C29.4613 23.3724 33.1404 20.8918 37.1969 19.2034C41.2535 17.5149 45.6061 16.6525 50 16.6666C52.6644 16.6833 55.319 16.9907 57.9167 17.5833C58.4603 17.7515 59.0326 17.8065 59.5983 17.745C60.164 17.6835 60.7111 17.5068 61.2058 17.2257C61.7006 16.9447 62.1326 16.5653 62.4751 16.1109C62.8177 15.6565 63.0635 15.1368 63.1975 14.5838C63.3314 14.0308 63.3507 13.4562 63.2541 12.8954C63.1575 12.3346 62.9471 11.7996 62.6358 11.3233C62.3245 10.847 61.919 10.4394 61.4442 10.1259C60.9693 9.81228 60.4353 9.59927 59.875 9.49998C56.6381 8.73849 53.3253 8.34709 50 8.33331C41.7681 8.37608 33.7333 10.8563 26.9096 15.461C20.0859 20.0657 14.7791 26.5886 11.6589 34.2064C8.53865 41.8241 7.74486 50.1955 9.37768 58.264C11.0105 66.3325 14.9967 73.7365 20.8334 79.5416C28.5696 87.2814 39.0569 91.6411 50 91.6667C61.0507 91.6667 71.6488 87.2768 79.4628 79.4628C87.2768 71.6488 91.6667 61.0507 91.6667 50C91.6667 48.8949 91.2277 47.8351 90.4463 47.0537C89.6649 46.2723 88.6051 45.8333 87.5 45.8333Z" fill="#2ECD99" stroke="white" strokeWidth="5"/>
                    </svg>
                    <span className="title-fa-h">
                        Google Auth disabled
                    </span>
                    <br />
                    <div onClick={() => Rel()} className="dashboard-btn-fa">
                        <span className="title-fa-h" style={{color: "white"}}>Ok</span>    
                    </div>
                </div>
                    :
                <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <span className="title-fa-h" style={{ fontSize: 16}}>
                       Disable 2FA
                    </span>
                    <br />
                    <div className="exchange-input" style={{ width: "100%", paddingTop: 10 }}>
                        <input 
                                type="text"
                                name="subaccount_name"
                                placeholder='2FA-code'
                                style={{textAlign: "center"}}
                                onChange={(e) => onChange(e.target.value)}
                                value={str_fa(token)}
                        />
                    </div>
                    <Err err={err}/>
                    <div style={{width: "100%", display: "flex", justifyContent: "space-between", paddingTop: 10}}>
                        <div onClick={() => Auth()} className="dashboard-btn-fa">
                            <span className="title-fa-h" style={{color: "white"}}>Ok</span>    
                        </div>
                        <div style={{padding: 5}}/>
                        <div onClick={() => close()} className="dashboard-btn-fa"  style={{backgroundColor: "#3A3A3C"}}>
                            <span className="title-fa-h" style={{color: "white"}}>Cancel</span>    
                        </div>
                    </div>
                </div>
            }
        </FabeCont>
    )
}