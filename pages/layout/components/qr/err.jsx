export const Err = ({ err, padding = 12 }) => {

    if(err === false) return (
        <div style={{ padding: padding}}></div>
    )
    return (
        <div style={{display: "flex", alignItems: "center", width: "100%", paddingTop: 10}}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="7" fill="#E89898"/>
                <line x1="3.35355" y1="3.64645" x2="10.4246" y2="10.7175" stroke="white"/>
                <line x1="3.64645" y1="10.7175" x2="10.7175" y2="3.64645" stroke="white"/>
            </svg>
            <p style={{display: "flex", alignItems: "center", fontSize: 12, color: "#E89898"}}>&nbsp;Invalid code</p>
        </div>
    )
}