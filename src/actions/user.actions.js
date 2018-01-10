export const login = (email, token) => {
    console.log(" user action got token: " + token);
    return {
        type: 'LOGIN',
        email: email,
        token: token
    };
};
 
export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};
 
export const signup = (email, token) => {
    return (dispatch) => {
    };
};
