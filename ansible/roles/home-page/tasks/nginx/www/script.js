const IP = window.location.hostname
const URL = `http://${IP}:4200`
let theme = "dark"

const DARK_MODE = {
    "--boxShadow": "rgba(0, 0, 0, 0.3)",
    "--bodyBg": "rgba(0, 0, 0, 0.774)",
    "--hover":  "#2196F3",
    "--active":  "#2cb2ff",
    "--server": "#00000050",
    "--serverBorder": "#000000",
    "--serverTitle": "rgba(255, 255, 255, 0.75)",
}

const LIGHT_MODE = {
    "--boxShadow": "rgba(0, 0, 0, 0.3)",
    "--bodyBg": "rgb(0 0 0 / 0%)",
    "--hover":  "#000000bd",
    "--active":  "#000000",
    "--server": "#2196F3",
    "--serverBorder": "#2196F3",
    "--serverTitle": "rgb(0 0 0 / 75%)",
}

const redirect = (path) => {
    window.location.href = `/${path}`;
}

const redirectNewTab = (path) => {
    window.open(`${path}`, "_blank");
}

const showState = () => {
    document.getElementById('states').style.display = "flex";
}



const toggleTheme = () => {
    if (theme === "dark") {
        loadTheme(LIGHT_MODE)
        theme = "light"
    } else {
        loadTheme(DARK_MODE)
        theme = "dark"
    }
    setThemeImg()
    window.localStorage.setItem('theme', theme);
}


const loadTheme = (themeCss) => {
    const root = document.querySelector(':root');
    for (const iterator in themeCss) {
        root.style.setProperty(iterator, themeCss[iterator]);
    }
}

const setThemeImg = () => {
    const element = document.getElementById("theme-img")
    if (theme === "dark") { 
        element.src = "./assets/sun.png"
        return
    }
    element.src = "./assets/moon.png"
}

if (window.localStorage.getItem('theme')) {
    theme = window.localStorage.getItem('theme');
    if (theme === "dark") { 
        loadTheme(DARK_MODE)
    } else {
        loadTheme(LIGHT_MODE)
    }
} else {
    loadTheme(DARK_MODE)
}

setThemeImg()
