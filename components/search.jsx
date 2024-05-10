export const Search = ({ onChange, text_traid }) => {
    return (
        <div className="trading-block-search">
            <input onChange={(e) => onChange(e.target.value)} type="text" placeholder={"Search ...."}/>
            <div className="trading-block-search-btn">
                <img src="https://skyrex.io/img/search.svg" alt="" />
            </div>
        </div>
    )
}