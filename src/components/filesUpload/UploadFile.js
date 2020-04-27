import React, { useState } from 'react';
import FilesUploaded from './FilesUploaded';
import { useDispatch } from 'react-redux'
import { uploadFile } from '../../store/actions/fileAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProgressBar } from 'react-bootstrap';
import useDecodeToken from '../../hooks/useDecodeToken';


const UploadFile = () => {
  const [file, setFile] = useState({});
  const dispatch = useDispatch();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [userId] = useDecodeToken();


  const handleChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', JSON.stringify(userId));

    const options = {
      onUploadProgress: ProgressEvent => {
        let percent = Math.floor((ProgressEvent.loaded * 100) / ProgressEvent.total)
        setUploadPercentage(percent)
      }
    }
    dispatch(uploadFile(formData, options));
  }



  return (

    <div className="body-container-wrapper">
      <div className="body-container">
        <div className="page-center">
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