export const TitleWeb = ({ index }) => {
    let title = "Dashboard"

    if(index === 1)  title = "Trading diary"
    if(index === 2)  title = "Exchange account"

    return (
        <div className="content-header-title">
            <p>{title}</p>
        </div>
    )
}