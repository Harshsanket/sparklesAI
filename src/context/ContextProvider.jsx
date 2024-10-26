import { createContext, useContext, useState } from "react";

export const modelContext = createContext()

export const UseModelContext = ({children}) => {
const [modelInfo, setModelInfo] = useState("llama3-8b-8192")
const [voices, setVoices] = useState()
const [selectedVoice, setSelectedVoice] = useState()
const [admin, setAdmin] = useState("")
const [assistant, setAssistant] = useState("")
return (
    <modelContext.Provider value={{modelInfo, setModelInfo, voices, setVoices, selectedVoice, setSelectedVoice, admin, setAdmin, assistant, setAssistant}}>
        {children}
    </modelContext.Provider>
)
}

export const modelContextProvider = () => {
    return (useContext(modelContext))
}