"use client"
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react"
  
  // 1. Define the shape of your context value
  interface AuthContextType {
    token: string | null
    isLoggedIn: boolean
    AuthorizationToken: string
    storeTokenInLS: (token: string) => void
    logoutUser: () => void
  }
  
  // 2. Create the context with initial value as undefined
  export const AuthContext = createContext<AuthContextType | undefined>(undefined)
  
  // 3. Provider Props type
  interface AuthProviderProps {
    children: ReactNode
  }
  
  // 4. AuthProvider component
  export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(
      () => typeof window !== "undefined" ? localStorage.getItem("token") : null
    )
  
    const isLoggedIn = !!token
    const AuthorizationToken = `Bearer ${token}`
  
    const storeTokenInLS = (newToken: string) => {
      setToken(newToken)
      localStorage.setItem("axios_token", newToken)
    }
  
    const logoutUser = () => {
      setToken(null)
      localStorage.removeItem("token")
    }
  
    useEffect(() => {
      const storedToken = localStorage.getItem("token")
      if (storedToken) {
        setToken(storedToken)
      }
    }, [])
  
    return (
      <AuthContext.Provider
        value={{ token, isLoggedIn, AuthorizationToken, storeTokenInLS, logoutUser }}
      >
        {children}
      </AuthContext.Provider>
    )
  }
  
  // 5. useAuth hook
  export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
  }
  