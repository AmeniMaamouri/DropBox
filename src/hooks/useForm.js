import {useState} from 'react'

const useForm = () => {

    const [value, setValues] = useState({});

    const handleChange = (e) => {
        e.persist();
        setValues({...value, [e.target.name]: e.target.value});
    }

    return [value, handleChange]
    
}

export default useForm