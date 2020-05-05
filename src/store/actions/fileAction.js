import axios from 'axios'
import FileDownload from "js-file-download";


export const uploadFile = (file, options) => {
    return (dispatch, getState) => {
        axios.post('http://localhost:4000/', file, options).then(res => {
            dispatch({ type: 'UPLOAD_FILE', res: res.data.msg })
        }).catch((err) => {
            dispatch({ type: 'UPLOAD_FILE_ERROR', err })
        })
    }
}

export const getFilesUploaded = (userId) => {
    return (dispatch, getState) => {
        axios.get('http://localhost:4000/', { params: userId }).then(res => {
            dispatch({ type: 'GET_FILES_SUCCESS', data: res.data })
        }).catch((err) => {
            dispatch({ type: 'GET_FILES_ERROR', err })
        })
    }
}

export const downloadFile = (url, role, userId) => {
    
    return (dispatch, getState) => {
         axios({
         url: `http://localhost:4000/download/${url}`, //your url
         params:{
             role,
             userId
         },
         responseType: 'blob',
        })
            .then((response) => {

                if (response.data.size === 0) {
                    dispatch({ type: 'NOT_FOUND', msg: 'Not Found' })
                    
                } else {
                   
                    console.log(response)
                        FileDownload(response.data, response.headers['cache-control']);
                        response.headers['cache-control'] = ""
                        axios.put('http://localhost:4000/download/' + url)
                        dispatch({ type: 'DOWNLOAD_FILE' })
                }

            }).catch((err) => {
               
                dispatch({ type: 'DOWNLOAD_FILES_ERROR', err })
            })
    }

}


export const deleteFile = (fileId,userId) => {
    return (dispatch, getState) => {
        axios.delete('http://localhost:4000/', { params: {
            fileId, userId
        } }).then(res => {
            dispatch({ type: 'DELETE', msg: res.data.message })
        }).catch(err => {
            dispatch({ type: 'DELETE_FIALED', err })
        })
    }
}

export const editFiles = (files) => {

    return {
        type: 'EDIT_FILES',
        files
    }

}

export const addFiles = (file) => {

    return {
        type: 'ADD_FILES',
        file
    }

}

export const addToken = (token) => {

    return {
        type: 'ADD_TOKEN',
        token
    }

}
export const editErrMsg = (msg) => {
    console.log(msg)
    // return{
    //     type: "EDIT_ERR_MSG",
    //     msg
    // }
}