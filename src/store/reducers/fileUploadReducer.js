const initState = {
    msg: '',
    progress: '',
    notFoundFile:'',
    filesUploaded: [],
    errDownload: '',
    token: {}
}

const fileUploadReducer = (state = initState, action) => {

    switch (action.type) {
        case 'UPLOAD_FILE':
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
        case 'DOWNLOAD_FILES_ERROR':
            return {
                ...state,
                errDownload: 'You have reached your limit, please try again after 1 min'

            }

        case 'NOT_FOUND':
            return {
                ...state,
                notFoundFile: action.msg
            }

            case 'NO_FILE': 
            return{
                ...state,
                msg: action.msg

            }

        case 'EDIT_FILES':
            return {
                ...state,
                filesUploaded: action.files
            }

        case 'ADD_FILES':
            return {
                ...state,
                filesUploaded: [action.file, ...state.filesUploaded]
            }

        default:
            return state;
    }
}

export default fileUploadReducer