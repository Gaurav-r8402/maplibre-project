import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import { DashboardProvider } from "@/context/DashboardContext";
import React from "react";

export default function DashboardLayout({
    children,
}:{
    children:React.ReactNode;
}){
    return(
        <DashboardProvider>
            <div className="flex h-screen w-full dark:bg-black">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <div className="shrink-0">
                        <Navbar />
                    </div>
                    <main className="flex-1 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </DashboardProvider>
    )
}
