import axios from 'axios';

export const registerAction = (user) => {
    return (dispatch, getState) => {
        axios.post('http://localhost:4000/signup', user).then((res) => {
            dispatch({type : 'REGISTER', message: res.data.message})
        }).catch((err) => {
            dispatch({type : 'REGISTER_FAILED', err})
        })
    }
}

export const login = (user) => {

    return (dispatch, getState) => {
        axios.post('http://localhost:4000/signin', user).then(res => {
            dispatch({type: 'LOGIN', msg: res.data.message, token: res.data.userToken });
        }).catch(err => {
            dispatch({type : 'LOGIN_FAILED', err});
        })
    }

}