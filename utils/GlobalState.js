"use client";

import React, { createContext, useState, useEffect } from 'react'
import UserAPI from '../api/UserAPI'
import apiConfig from './apiConfig';
export const GlobalState = createContext()


export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)
    const [reloadProvider, setReloadProvider] = useState(false)



    useEffect(() => {
        let timeoutId
        if (reloadProvider) {
            const firstLogin = localStorage.getItem('firstLogin')
            if (firstLogin) {
                const refreshToken = async () => {
                    try {
                        const res = await apiConfig.baseAPI.post('/api/auth/access', {}, { withCredentials: true })
                        setToken(res.data.ac_token)
                        setReloadProvider(false)
                    } catch (error) {
                        console.log("Error refreshing access token:", error)
                        clearTimeout(timeoutId) // cancel the timeout if an error occurs
                    }
                    timeoutId = setTimeout(refreshToken, 2*10*1000); //2 minutes
                }
                refreshToken()
            }
        }
    }, [reloadProvider])

    const state = {
        token: [token, setToken],
        userAPI: UserAPI(token),
        reloadProvider: [reloadProvider, setReloadProvider]
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}