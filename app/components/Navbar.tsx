"use client";

import { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import ProfileImg from "@/public/profile.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { MdOutlineWbSunny, MdOutlineNightlight } from "react-icons/md";
import { useDashboard } from "@/context/DashboardContext";

export default function Navbar() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted]= useState(false);
    const { setSearchState, triggerSearch}= useDashboard();

    useEffect(()=> setMounted(true), []);
    if(!mounted) return null;
    return (
        <div className="w-full h-16 p-2 border-b border-gray-300 dark:border-neutral-800 flex items-center justify-between px-6">
            <div className="relative border-2 rounded ml-4">
                <input type="search" onChange={(e) => setSearchState(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && triggerSearch()} 
                placeholder="Search State..." className="input shadow-xs focus:border border-neutral-800 px-5 py-2 dark:bg-black  w-80 transition-all focus:w-96 outline-none" name="search" />
                <svg
                    className="size-6 absolute top-2 right-3 text-neutral-800"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    ></path>
                </svg>
            </div>
            <div className="flex items-center gap-6">
                <button onClick={()=> setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-gray-100 dark:bg-neutral-950 text-black border-[1px] border-gray-300 dark:text-white text-lg">{theme === "dark" ? <MdOutlineWbSunny /> : <MdOutlineNightlight />}</button>
                <FiBell className="text-2xl dark:text-white cursor-pointer" />
                <Image
                    src={ProfileImg}
                    alt="User"
                    className="w-8 h-8 rounded-full border border-gray-400 dark:bg-neutral-600"
                />
            </div>
        </div>

    );
}