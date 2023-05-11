"use client";

import { useState, useEffect } from 'react'
import apiConfig from '../utils/apiConfig';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [user,setUser] = useState("")

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await apiConfig.baseAPI.get('/api/auth/infor', {
                        headers: { Authorization: token }
                    })
                    setIsLogged(true)
                    setUser(res.data)
                } catch (err) {
                    console.log("🚀 ~ getUser ~ err", err)
                    window.sessionStorage.clear();
                    localStorage.clear();
                    setIsLogged(false);
                }
            }
            getUser()
        }
    }, [token])
    return {
        isLogged: [isLogged, setIsLogged],
        userDetails:[user,setUser]
    }
}

export default UserAPI