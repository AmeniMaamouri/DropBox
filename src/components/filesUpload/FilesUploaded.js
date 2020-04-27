import React, { useEffect } from 'react';
import { getFilesUploaded, downloadFile, deleteFile, editFiles, addFiles } from '../../store/actions/fileAction';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { useHistory } from "react-router-dom";
import jwt from 'jsonwebtoken'
import { FaRegTrashAlt } from 'react-icons/fa'
import _ from 'lodash';

const FilesUploaded = () => {

  let history = useHistory();
  let socket = io('http://localhost:4000')
  const dispatch = useDispatch();
  const FilesUploaded = useSelector(state => state.file.filesUploaded)


  useEffect(() => {
    var token = localStorage.getItem('token');
    jwt.verify(token, '3023b0f5ec57', function (err, decoded) {
      if (err) { // Manage different errors here (Expired, untrusted...)
        localStorage.clear();
        window.location.reload();
      }
      dispatch(getFilesUploaded(decoded.userId))
    });
    dispatch(downloadFile(history.location.pathname.split('/')[2]))
  }, [dispatch, history])


  useEffect(() => {
    socket.on('fileUploaded', (data) => {
      dispatch(addFiles(data))
    })
  },[dispatch])

  const handleClick = (id) => {
    dispatch(deleteFile(id))
    const files = _.filter(FilesUploaded, (file => {
      return file._id !== id
    }))
    dispatch(editFiles(files))
  }

  return (
    <div className="file-upload-bar">
      <div className="bar-wrapper">
        <div className="overall"><span>Files Uploaded</span>
        </div>
        <div className="individual-files">
          <ul>
            {FilesUploaded && FilesUploaded.map((file) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <li key={file._id}>
                  <div className="col-*-2 trashIcon">
                    <div className="trashIcon" >
                      <FaRegTrashAlt value={file._id} onClick={() => handleClick(file._id)} className="trash" />
                    </div>
                  </div>
                  <div className="col-*-10 filenameList">
                    <span className="filename"><i>File Name:</i><b>{file.fileName}</b></span>
                    <span className="filesize"><i>File Size:</i><b>{file.fileSize}</b></span>
                    <a href={"/download/" + file._id} className="copy-link"><b>Download</b></a>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FilesUploaded;