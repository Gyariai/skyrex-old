export const Loading = () => {
    return  (
        <div style={{display: 'flex', width: "100%", height: "100vh", alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0}}>
            <svg width="129" height="150" viewBox="0 0 43 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.507 31.9753C13.3632 31.9753 15.7491 29.6983 15.7491 26.4373C15.7491 23.6262 13.7794 21.9676 11.1161 20.787L9.31281 19.9998C7.23211 19.0722 6.39984 18.0883 6.39984 16.6265C6.39984 14.9679 7.87019 14.0121 9.53474 14.0121C10.4996 14.0121 11.2637 14.2244 11.9298 14.6291H15.219C14.2893 12.8942 11.9206 11.5664 9.61797 11.5664C6.70501 11.5664 3.87527 13.5342 3.87527 16.5702C3.87527 19.0722 5.17917 20.9275 8.17536 22.2206L9.97863 23.0078C12.0871 23.9354 13.1968 24.8912 13.1968 26.7185C13.1968 28.4614 11.7541 29.5296 9.47926 29.5296C8.14747 29.5296 6.96339 28.9989 6.04848 28.2594H2.7959C3.99468 30.7109 6.64952 31.9753 9.507 31.9753Z" fill="#14B16A"/>
                <path d="M13.2332 33.3922H16.5486L21.4222 27.0061L25.1425 31.9689H28.4579L23.1462 25.031L29.2797 16.9331H25.9975L21.4554 22.9901L16.1426 16.0645H12.8604L19.6982 25.031L13.2332 33.3922Z" fill="#14B16A"/>
                <path d="M35.8795 8.57154L34.1558 10.5466L29.2828 16.9328H25.9995L32.432 8.57154L34.1226 6.53061L38.7304 0.473633H42.0122L35.8795 8.57154Z" fill="#14B16A"/>
                <path d="M10.3981 41.4895L8.67432 43.4646L3.80133 49.8508H0.518097L6.95053 41.4895L8.64116 39.4486L13.249 33.3916H16.5308L10.3981 41.4895Z" fill="#14B16A"/>
            </svg>
        </div>
    )
}

export const LoadingData = () => {
    return  (
        <div style={{display: 'flex', width: "100%", height: "100vh", alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0}}>
            <div className='loader-conteiner-back'>
                <div className='loader-conteiner'>
                    <svg className='loader-svg' viewBox="25 25 50 50">
                        <circle className='loader-circle' cx="50" cy="50" r="20"></circle>
                    </svg>
                </div>
            </div>
        </div>
    )
}