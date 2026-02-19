'use client';
import { AuthProvider } from "@/context/authContext";
import { useAuth } from "@/context/authContext";

const AuthGateway = ({ children }) => {
    const { loading } = useAuth();
    if(loading){
        return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-md transition-opacity duration-300">
          <div className="h-12 w-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
        )
    }

    return children;
}

const AuthWrapper = ({ children }) => {
    return (
        <AuthProvider>
            <AuthGateway>
                {children}
            </AuthGateway>
        </AuthProvider>
    )
}

export default AuthWrapper;