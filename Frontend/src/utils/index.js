const TOKEN_KEY = 'jwt';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'

export const login = () => {
    localStorage.setItem(TOKEN_KEY, 'Login');
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    fetch(`${API_ENDPOINT}/api/logout`, { credentials: 'include', method: 'POST' })
    console.log("logget out")
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}

export default login