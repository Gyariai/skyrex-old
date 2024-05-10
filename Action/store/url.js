export function urlSearchParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const { key, index } = Object.fromEntries(urlSearchParams.entries());

    return {
        key: key ? key : false,
        index: index ? index : 0
    }
   
}

export function themeDefault() {
    const theme = localStorage.getItem("theme")

    return theme ? theme : "light"
   
}