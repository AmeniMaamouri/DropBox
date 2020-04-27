
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken'

const useDecodeToken = () => {

    const [userId, setUserId] = useState('')

    useEffect(()=> {
        var token =  localStorage.getItem('token');
        const tokenPayload = jwt.decode(token);
        setUserId(tokenPayload.userId)
      },[])

      return [userId]

}

export default useDecodeToken