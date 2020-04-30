
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken'

const useDecodeToken = () => {

    const [user, setUser] = useState({})

    useEffect(()=> {
        var token =  localStorage.getItem('token');
        const tokenPayload = jwt.decode(token);
        setUser({userId: tokenPayload.userId, role: tokenPayload.role})
      },[])

      return [user]

}

export default useDecodeToken