import React,{useEffect,useState} from 'react';
import {useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom";
import UploadInterface from './UploadInterface';
import { downloadFile } from '../../store/actions/fileAction';
import jwt from 'jsonwebtoken'


const DownloadFile = () => {

    const dispatch = useDispatch();
    let history = useHistory();
    const [decoded, setDecoded] = useState('');

    useEffect( () => {
        var token = localStorage.getItem('token');
        jwt.verify(token, '3023b0f5ec57', function (err, decoded) {
          if (err) { // Manage different errors here (Expired, untrusted...)
            localStorage.clear();
            window.location.reload();
            setDecoded(decoded.role)
          }
          dispatch(downloadFile(history.location.pathname.split('/')[2], decoded.role))
          history.push('/')
        });
        
      },[localStorage.getItem('token')])

      

    return ( 
        <UploadInterface />
     );
}
 
export default DownloadFile;