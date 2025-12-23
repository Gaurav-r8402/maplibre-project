"use client";

import { useState } from "react";
import Link from "next/link";
import {  FiUser, FiSettings, FiMenu } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaArrowRight, FaUsers } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { PiSignOutFill } from "react-icons/pi";

export default function Sidebar(){
    const pathname=usePathname();
    const [open,setopen]=useState(true);

    const menuItems=[
        {name: "Overview", icon: <MdOutlineDashboard />, href: "/dashboard"},
        {name: "Demographics", icon: <FaUsers />, href:"/dashboard/birthdeathpage"},
        {name: "Profile", icon: <FiUser />, href: "/profile"},
        {name: "Settings", icon: <FiSettings />, href: "/settings"}
    ];

    // const support =[
    //     {name: "Log Out", icon:, href:""},
    // ]

    return (
        
            <div className={`relative border-r border-gray-300  z-40 dark:border-neutral-800 h-screen bg-white dark:bg-black text-black ${open ? "w-64" : "w-16"} duration-300 p-4 flex flex-col`}>
                <div className="flex justify-between">
                    <h2>
                        {open && <span className="text-3xl font-semibold dark:text-white">MapLibre</span>}
                    </h2>   
                    <button onClick={() => setopen(!open)} className="absolute -right-4 top-3 p-2 bg-black dark:border border-gray-300 h-8 w-8 rounded-full flex items-center justify-center text-white text-2xl mb-6"><FaArrowRight className={`transition-transform duration-300 ${open ? "" : "rotate-180"}`}/> </button>
                </div>
                <nav className="flex flex-col gap-4 mt-14 ">
                    <p>
                        {open && <span className="pl-2 text-gray-400 text-sm">General</span>}
                    </p>
                    {menuItems.map((item, index) => {
                        const active=pathname === item.href;
                        return(
                            <Link href={item.href} key={index}  className={`${open ? "justify-start gap-3" : "justify-center"} flex items-center gap-3 p-2 hover:bg-gray-700 hover:dark:bg-gray-700 hover:text-white rounded-md text-center ${active ? "bg-gray-700 text-white" : "bg-white text-black dark:bg-black dark:text-white"}`}>
                            <span className="text-xl">{item.icon}</span>
                            {open && <span className="text-sm">{item.name}</span>}
                            </Link>
                        )
                    })}
                    <p>
                        {open && <span className="pl-2 text-gray-400 text-sm">Support</span>}
                    </p>
                    <button  onClick={() => signOut({ redirect: true, callbackUrl: "/login" })} className={`flex items-center gap-3 p-2  hover:bg-gray-700 hover:text-white dark:text-white  rounded-md text-center `}>
                        <span className="text-xl"><PiSignOutFill /></span>
                        {open && <span className="text-sm">Log Out</span>}
                    </button>
                </nav>

            </div>
    )
}