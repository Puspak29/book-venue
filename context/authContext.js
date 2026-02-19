import { createContext, useContext, useState, useEffect } from 'react';
import checkAuth from '@/app/actions/checkAuth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth]= useState(false);
    const [currUser, setCurrUser]= useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const checkAuthentication = async () => {
            setLoading(true);
            try{
                const { isAuth, user } = await checkAuth();
                setIsAuth(isAuth);
                setCurrUser(user);
            }
            catch(error){
                setIsAuth(false);
                setCurrUser(null);
            }
            finally{
                setLoading(false);      
            }
            
        }

        checkAuthentication();
    },[])

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth, currUser, setCurrUser, loading, setLoading}}>
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