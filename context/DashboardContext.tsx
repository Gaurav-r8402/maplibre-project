"use client";

import { createContext, useContext, useState } from "react";

type DashboardContextType = {
    searchState: string;
    setSearchState: (v:string) => void;
    triggerSearch: ()=> void;
    trigger: boolean;
    clearTrigger: ()=> void;
};

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }:{children:React.ReactNode}) {
    const [ searchState, setSearchState]= useState("");
    const [trigger, setTrigger]=useState(false);

    return (
        <DashboardContext.Provider 
        value={{
            searchState,
            setSearchState,
            triggerSearch: () => setTrigger(true),
            trigger,
            clearTrigger: () => setTrigger(false)
        }}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const ctx= useContext(DashboardContext);
    if(!ctx) {
        throw new Error(" useDashboard must be used inside DashboardProvider");
    }
    return ctx;
}