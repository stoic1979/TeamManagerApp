const defaultState = {
    isLoggedIn: false,
    email: '',
    token: ''
};
 
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN': 
        console.log(action.token);
            console.log(" user reducer got email: " + action.email);

            return Object.assign({}, state, { 
                isLoggedIn: true,
                email: action.email,
                token: action.token
            });
        case 'LOGOUT':
            return Object.assign({}, state, { 
                isLoggedIn: false,
                email: '',
                token: ''
            });
        default:
            return state;
    }
}