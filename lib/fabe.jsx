import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import "./style.scss"

export const FabeCont = ({ className, status, children, close = () => null, back }) => {
    const [ active, setActive ] = useState("")

    const { theme } = useSelector(state => state.global.theme)
    
    useEffect(() => {
        if(status) {
            setActive("block")
        } else {
            if(active) {
                setActive("animate_close")
                setTimeout(() => {
                    setActive("none")
                }, 500)
            } else {
                setActive("none")
            }
        }
        // eslint-disable-next-line 
    }, [status])

    return  (
        <>  {
                back !== "no" ?
                <div 
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: theme === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
                        zIndex: 100,
                    }}
                    
                    onClick={() => close()}

                    className={active}
                />
                : null
            }
            
            <div className={`${className} ${active}`} style={{zIndex: 100}}>
                {children}
            </div>
        </>
        
    )
}

export const LoadAnimate = ({ status }) => {
    const [ active, setActive ] = useState(false)
    
    useEffect(() => {
        setActive(status)
    }, [status])

    if(active === false) return null

    return  <>
        <img className="rotation" src="https://skyrex.io/img/exchange-icon.svg" alt=""/>
    </>
}