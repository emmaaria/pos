import {createContext, useContext, useEffect, useState} from "react";

const ModeContext = createContext()
export const ModeProvider = ({children}) => {
    const [mode, setMode] = useState('light')

    useEffect(() => {
        const cmode = sessionStorage.getItem('mode');
        if (cmode !== null) {
            setMode(cmode)
        } else {
            setMode('light')
        }
    }, []);

    const changeMode = () => {
        if (mode === 'light') {
            setMode('dark')
            sessionStorage.setItem('mode', 'dark')
        } else {
            setMode('light')
            sessionStorage.setItem('mode', 'light')
        }
    }
    return (
        <ModeContext.Provider value={{
            mode, changeMode
        }}>
            {children}
        </ModeContext.Provider>
    )
}
export default function useMode() {
    return useContext(ModeContext);
}