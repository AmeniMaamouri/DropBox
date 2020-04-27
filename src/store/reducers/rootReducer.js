import { combineReducers } from 'redux';
import fileUploadReducer from './fileUploadReducer';
import authReducer from './authReducer';

const RootReducer = combineReducers({
    auth: authReducer,
    file: fileUploadReducer
})

export default RootReducer