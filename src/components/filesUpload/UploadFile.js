import React, { useState } from 'react';
import FilesUploaded from './FilesUploaded';
import { useDispatch, useSelector } from 'react-redux'
import { uploadFile } from '../../store/actions/fileAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProgressBar } from 'react-bootstrap';
import useDecodeToken from '../../hooks/useDecodeToken';
import _ from 'lodash';

const UploadFile = () => {
  const [file, setFile] = useState({});
  const [fileSize, setFileSize] = useState('');
  const [fileName, setFileName] = useState('');
  const dispatch = useDispatch();
  const [premiumMsg, setPremiumMsg] = useState('')
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [user] = useDecodeToken();
  const errDownload = useSelector(state => state.file.errDownload)
  const NotFoundFile = useSelector(state => state.file.msg)
  const UploadedFiles = useSelector(state => state.file.filesUploaded)
  const [existFile, setExistFile] = useState('')

  const handleChange = (e) => {

    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileSize(e.target.files[0].size)
      setFileName(e.target.files[0].name)
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', JSON.stringify(user));
    setUploadPercentage(0)
    const options = {
      onUploadProgress: ProgressEvent => {
        let percent = Math.floor((ProgressEvent.loaded * 100) / ProgressEvent.total)
        setUploadPercentage(percent)
      }
    }

    if (fileSize > 500000000) {
      if (user.role === 'Regular') {
        setUploadPercentage(0)
        setPremiumMsg('File size greater than 500 Mo, you need to buy premium.')
      } else {
        const exist = _.find(UploadedFiles, (file => {
          return file.fileName === fileName
        }))
        
        if(exist){
          setPremiumMsg('File already uploaded, check your files list')
        }else{
         setPremiumMsg('')
         setUploadPercentage(0)
         dispatch(uploadFile(formData, options));
        }
      }
    } else if (fileSize === 0){
      dispatch({type : "NO_FILE", msg : 'File size: 0 Bytes, Please try with another file'})
    } else {

      const exist = _.find(UploadedFiles, (file => {
        return file.fileName === fileName
      }))
     if(exist){
      setPremiumMsg('File already uploaded, check your files list')
     }else{
      setPremiumMsg('')
      setUploadPercentage(0)
      dispatch(uploadFile(formData, options));
     }

      
    }


  }

  return (

    <div className="body-container-wrapper">
      <div className="body-container">
        <div className="page-center">
        
          {NotFoundFile === 'File size: 0 Bytes, Please try with another file' ? <div className="premiumMsg">{NotFoundFile}</div> :null}
          {errDownload ? NotFoundFile || premiumMsg || uploadPercentage > 0 ? null : <div className="premiumMsg">{errDownload}</div> : null}
          {premiumMsg ?  <div className="premiumMsg">{premiumMsg}</div> : null }
          {uploadPercentage === 100 ? <div className="completed">Upload Completed</div> : null}
          {uploadPercentage > 0 && uploadPercentage < 100 ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : null}
          <h1>Upload Your <strong>Files</strong> To DropBox</h1>
          <form onSubmit={handleSubmit} id="upload" method="post" action="/" encType="multipart/form-data">
            <div id="drop" className="custom-file mb-3">
              <input type="file" className="custom-file-input" name="file" onChange={handleChange} required />
              <label className="custom-file-label" htmlFor="customFile">Choose file</label>
              <button className="submit" type="submit">Upload</button>
            </div>
          </form>
          <FilesUploaded />
        </div>
        {uploadPercentage > 0 && <ProgressBar className="progBar" variant="custom" now={uploadPercentage} active="true" label={`${uploadPercentage}%`} />}
      </div>
    </div>

  );
}

export default UploadFile;