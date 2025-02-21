import axios from 'axios';
import { createContext, useEffect, useState } from 'react'



export const authContext = createContext();

export default function AuthContextProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null);
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");


    useEffect(() => {
        if (localStorage.getItem('token') != null) 
        {
            verifyToken();
        }
    },[]);

    function verifyToken() {
        axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken', {
            headers: {
                'token': localStorage.getItem('token')
            }
        }).then(({data}) => {
            setUserId(data.decoded.id);
            setUserName(data.decoded.name);
        }).catch(() => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
        });
    }

    return (<authContext.Provider value={{ isLoggedIn, setIsLoggedIn, userName, userId }}>
        {children}
    </authContext.Provider>
    )
}
