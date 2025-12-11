"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import WorldMapDemo from "@/components/worldMap";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleReset(e: any) {
        e.preventDefault();

        if (!password || !confirmPassword) {
            return toast.error("All fields are required!");
        }

        if (password !== confirmPassword) {
            return toast.error("Password does not match");
        }

        if (password.length < 6) {
            return toast.error("Password must be atleat 6 characters");
        }

        const loading = toast.loading("updating Password");

        const res = await fetch("/api/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        toast.dismiss(loading);

        const data = await res.json();

        if (res.ok) {
            toast.success("Password Updated Succesfully");
            window.location.href = "/login";
        } else {
            toast.error(data.error || "Something went wrong");
        }
    }
    return (
        <div className="w-full h-screen flex flex-col lg:flex-row bg-white  overflow-hidden dark:bg-black ">
            <div className="w-full lg:w-5/12 flex items-center justify-center p-6 lg:p-12 dark:bg-black">
            
                <div className="w-full max-w-md max-auto">
                    <h2 className="text-center text-3xl font-bold mb-2">Create new password</h2>
                    <p className="text-gray-500 text-sm text-center mb-10">Create your new password. If you forget it, then you have to do forgot password</p>
                    <form onSubmit={handleReset} className="flex flex-col gap-4">
                        <div className="shadow-sm flex gap-2 items-center bg-white dark:bg-black p-2 duration-300 border-2 border-gray-400 group delay-200 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock group-hover:rotate-[360deg] duration-300" viewBox="0 0 16 16">
                                <path d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3" />
                            </svg>
                            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} className="flex-1  focus:outline-none p-1 dark:bg-black dark:text-white" />
                        </div>
                        <div className="shadow-sm flex gap-2 items-center bg-white dark:bg-black p-2 duration-300 border-2 border-gray-400 group delay-200 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock group-hover:rotate-[360deg] duration-300" viewBox="0 0 16 16">
                                <path d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3" />
                            </svg>
                            <input placeholder="Confirm Password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} className="flex-1  focus:outline-none p-1 dark:bg-black dark:text-white" />
                        </div>
                        <button type="submit" className="w-full relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-sm cursor-pointer rounded-md shadow-zinc-900 transition-tranform duration-300 ease-in-out hover:scale-105 active:scale-95">
                            <span className="absolute inset-0 rounded-md p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                            <span className="relative z-10 block px-6 py-3 rounded-md bg-gray-950 dark:bg-white dark:text-black">
                                <div className="relative z-10 flex justify-center items-center space-x-2">
                                    <span className="transition-all duration-500 group-hover:transition-x-1 ">
                                        Reset Password
                                    </span>
                                    <svg
                                        className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                                        data-slot="icon"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                            fillRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </span>
                        </button>
                    </form>
                   <Link href="/login"  className="flex items-center justify-center gap-2 text-sm hover:underline mt-7 text-neutral-500 pl-1"><FaArrowLeft />Back to log in</Link>
                </div>
            </div>
            <div className="hidden lg:block w-full">
                <WorldMapDemo />
            </div>
            <div className="lg:hidden w-full">
                <WorldMapDemo />
            </div>
        </div>
    )
}