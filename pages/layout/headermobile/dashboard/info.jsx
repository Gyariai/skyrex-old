import { text } from "../../../../_language/menu"
export const Info = () => {
    return (
        <div className="menu-block-link">
            <a href="https://skyrex.io/wiki/explore-features/" target="_blank" rel="noopener noreferrer" className="menu-block-link-item">
                <div className="menu-block-link-item-icon">
                    <img src="https://skyrex.io//img/links.svg" alt="" />
                </div>
                <div className="menu-block-link-item-title">
                    <p>
                        {text.use}
                    </p>
                </div>
            </a>
            <a href="https://skyrex.io/wiki/connect-exchanges/" target="_blank" rel="noopener noreferrer" className="menu-block-link-item">
                <div className="menu-block-link-item-icon">
                    <img src="https://skyrex.io//img/links.svg" alt="" />
                </div>
                <div className="menu-block-link-item-title">
                    <p>
                        {text.create}
                    </p>
                </div>
            </a>
            <a href="https://skyrex.io/wiki/profit-sharing/" target="_blank" rel="noopener noreferrer" className="menu-block-link-item">
                <div className="menu-block-link-item-icon">
                    <img src="https://skyrex.io//img/links.svg" alt="" />
                </div>
                <div className="menu-block-link-item-title">
                    <p>
                        {text.pay}
                    </p>
                </div>
            </a>
        </div>
    )
}