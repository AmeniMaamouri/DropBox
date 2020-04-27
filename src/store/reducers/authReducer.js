const initState = {
    registerMsg: '',
    loginMsg: ''
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REGISTER':
            return {
                ...state,
                registerMsg: action.message
            }
        case 'REGISTER_FAILED':
            return {
                ...state,
                registerMsg: action.err
            }
        case 'LOGIN':
            return{
                ...state,
                loginMsg: action.msg,
                token: action.token
            }
        case 'LOGIN_FAILED':
            return{
                ...state,
                loginMsg: action.err
            }
        default:
            return state;
    }

}

export default authReducer