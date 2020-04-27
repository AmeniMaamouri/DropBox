const initState = {
    msg: '',
    progress: '',
    filesUploaded: [],
    notFoundFile: ''
}

const fileUploadReducer = (state = initState, action) => {

    switch (action.type) {
        case 'UPLOAD_FILE_SUCCESS':
            return {
                ...state,
                msg: action.res
            }
        case 'UPLOAD_PROGRESS':
            return {
                ...state,
                progress: action.progress
            }

        case 'GET_FILES_SUCCESS':
            return {
                ...state,
                filesUploaded: action.data
            }

        case 'NOT_FOUND':
            return {
                ...state,
                notFoundFile: action.msg
            }

            case 'EDIT_FILES': 
            return{
                ...state,
                filesUploaded: action.files
            }

            case 'ADD_FILES': 
            return{
                ...state,
                filesUploaded: [action.file, ...state.filesUploaded]
            }
        default:
            return state;
    }
}

export default fileUploadReducer