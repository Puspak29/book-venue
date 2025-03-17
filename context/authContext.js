import { createContext, useContext, useState, useEffect } from 'react';
import checkAuth from '@/app/actions/checkAuth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth]= useState(false);
    const [currUser, setCurrUser]= useState(null);

    useEffect(()=>{
        const checkAuthentication = async () => {
            const { isAuth, user } = await checkAuth();
            setIsAuth(isAuth);
            setCurrUser(user);
        }

        checkAuthentication();
    },[])

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth, currUser, setCurrUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}