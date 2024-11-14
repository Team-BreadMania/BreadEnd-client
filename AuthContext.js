// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(null);

    return <AuthContext.Provider value={{ userAuth, setUserAuth }}>{children}</AuthContext.Provider>;
};
