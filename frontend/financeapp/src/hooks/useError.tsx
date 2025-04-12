import { createContext, useCallback, useContext, useState } from "react";

type ErrorContextType = {
    error: string;
    dispatchError: (message: string) => void;
  };

const ErrorContext = createContext<ErrorContextType | null>(null);

type ErrorProviderProps = {
    children: React.ReactNode;
  };

export const ErrorProvider : React.FC<ErrorProviderProps> = ({children}:any) => {
    const [error,setError] = useState("");

    const dispatchError = useCallback((message:string) => {
        setError(message);
        setTimeout(()=>{
          setError("")
        },5000)
    },[])

    return(
        <ErrorContext.Provider value={{error,dispatchError}}>
            {children}
        </ErrorContext.Provider>
    )
}

export const useError = () => {
    const errorContext = useContext(ErrorContext);
  
    if (!errorContext) {
      throw Error('useAuth needs to be used inside AuthContext');
    }
  
    return errorContext;
  };
