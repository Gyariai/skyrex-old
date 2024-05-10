import { useState } from "react"
import { PasswordPopup} from "./pass"

export const Links = () => {
    const [ status, setStatus ] = useState()
    return (
        <>
        <PasswordPopup status={status} setStatus={setStatus}/>
        <div className="account-content-inner">
            <div className="account-links">
                <a href="https://t.me/Skyrex_Support" target="_blank" rel="noopener noreferrer" className="account-links-item">
                    <div className="account-links-item-icon">
                        <img src="https://skyrex.io//img/support.svg" alt="" />
                    </div>
                    <div className="account-links-item-title">
                        <p>
                            Support
                        </p>
                    </div>
                </a>
                <div 
                    className="account-links-item mod-btn" 
                    data-mod="#change-password"
                   
                >
                    <div className="account-links-item-icon">
                        <img src="https://skyrex.io//img/lock.svg" alt=""/>
                    </div>
                    <div className="account-links-item-title" onClick={() => setStatus(true)}>
                        <p>
                            Change password
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}