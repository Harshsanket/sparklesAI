import { createContext, useContext, useState } from "react";

export const modelContext = createContext()

export const UseModelContext = ({children}) => {
const [modelInfo, setModelInfo] = useState("llama3-8b-8192")
return (
    <modelContext.Provider value={{modelInfo, setModelInfo}}>
        {children}
    </modelContext.Provider>
)
}

export const modelContextProvider = () => {
    return (useContext(modelContext))
}