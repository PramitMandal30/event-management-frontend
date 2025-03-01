import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        id: localStorage.getItem('auth_id') || '',
        token: localStorage.getItem('auth_token') || '',
        role: localStorage.getItem('auth_role') || ''
    });

    useEffect(() => {
        localStorage.setItem('auth_id', auth.id);
        localStorage.setItem('auth_token', auth.token);
        localStorage.setItem('auth_role', auth.role);
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
