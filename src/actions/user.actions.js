export const login = (username, password) => {
    return {
        type: 'LOGIN',
        username: username,
        password: password
    };
};
 
export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};
 
export const signup = (username, password) => {
    return (dispatch) => {
    };
};
