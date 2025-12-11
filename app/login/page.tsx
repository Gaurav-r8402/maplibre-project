"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import WorldMapDemo from "@/components/worldMap"
import Link from "next/link";
import googleImg from "@/public/google.png"
import Image from "next/image";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e: any) {
        e.preventDefault();

        if(!email || !password) {
            return toast.error("Please enter your email and Password");
        }

        const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)) {
            return toast.error("Please enter a valid email address");
        }

        if(password.length<6) {
            return toast.error("Password must be at least 6 characters long");
        }

        const res = await signIn("credentials", {
            email, password, redirect: false
        });

        if (!res?.error) {
            toast.success("Login Successfull")
            router.push("/dashboard");
        }else{ 
            toast.error("Invalid crdentials");
        }
    }

    return (
        <div className="w-full h-screen flex flex-col lg:flex-row bg-white  overflow-hidden dark:bg-black ">
            <div className="w-full lg:w-5/12 flex items-center justify-center p-6 lg:p-12 dark:bg-black">
                <div className="w-full max-w-md max-auto">
                    <h2 className="text-center text-3xl font-bold mb-2">Sign In</h2>
                    <p className="text-gray-500 text-sm text-center mb-10">Welcome back! Please enter your details</p>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="shadow-sm flex gap-2 items-center bg-white dark:bg-black p-2 duration-300 border-2 border-gray-400 group delay-200 rounded-md">
                            <svg
                                className="group-hover:rotate-[360deg] duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                height="1em"
                                width="1em"
                            >
                                <path
                                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                                ></path>
                                <path d="M22 6l-10 7L2 6"></path>
                            </svg>
                            <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} className="flex-1  focus:outline-none p-1 dark:bg-black dark:text-white" />
                        </div>
                        <div className="shadow-sm flex gap-2 items-center bg-white dark:bg-black p-2 duration-300 border-2 border-gray-400 group delay-200 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock group-hover:rotate-[360deg] duration-300" viewBox="0 0 16 16">
                                <path d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3" />
                            </svg>
                            <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} className="flex-1  focus:outline-none p-1 dark:bg-black dark:text-white" />
                        </div>
                        <div className="p-2 pl-4 flex justify-between">
                            <label
                                className="relative text-black dark:text-white flex cursor-pointer items-center gap-2"
                                htmlFor="tick"
                            >
                                <input className="peer appearance-none" id="tick" name="tick" type="checkbox" required/>
                                <span
                                    className="absolute left-0 top-1/2 h-4 w-4 -translate-x-full -translate-y-1/2 rounded-[0.25em] border-[2px] border-black dark:border-white"
                                >
                                </span>
                                <svg
                                    viewBox="0 0 69 89"
                                    className="absolute left-0 top-1/2 h-4 w-4 -translate-x-full -translate-y-1/2 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
                                    fill="none"
                                    height="89"
                                    width="69"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M.93 63.984c3.436.556 7.168.347 10.147 2.45 4.521 3.19 10.198 8.458 13.647 12.596 1.374 1.65 4.181 5.922 5.598 8.048.267.4-1.31.823-1.4.35-5.744-30.636 9.258-59.906 29.743-81.18C62.29 2.486 63.104 1 68.113 1"
                                        strokeWidth="6px"
                                        stroke="#008080"
                                        pathLength="100"
                                    ></path>
                                </svg>

                                <p className="text-xs font-bold [user-select:none]">Remember Me</p>
                            </label>
                            <span className="text-black dark:text-white underline text-xs">
                                <a href="/forgot-password">Forgot Password</a>
                            </span>
                        </div>
                        <button type="submit" className="w-full relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-sm cursor-pointer rounded-md shadow-zinc-900 transition-tranform duration-300 ease-in-out hover:scale-105 active:scale-95">
                            <span className="absolute inset-0 rounded-md p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                            <span className="relative z-10 block px-6 py-3 rounded-md bg-gray-950 dark:bg-white dark:text-black">
                                <div className="relative z-10 flex justify-center items-center space-x-2">
                                    <span className="transition-all duration-500 group-hover:transition-x-1 ">
                                        Let's Get Started
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
                    <div className="flex items-center w-full gap-4 my-8 select-none">
                        <div className="flex-1 h-px bg-gray-400 dark:bg-gray-600" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">OR</span>
                        <div className="flex-1 h-px bg-gray-400 dark:bg-gray-600" />
                    </div>
                    <button onClick={()=> signIn("google", {callbackUrl: "/dashboard" })} className="flex items-center justify-center gap-3 w-full p-2 border-2 border-zinc-900 shadow-sm cursor-pointer rounded-md shadow-zinc-900">
                        <Image src={googleImg} alt="google auth" className="w-5 h-5" />
                        <span className="font-semibold leading-6 text-black dark:text-white ">Sign In With Google</span>
                    </button>
                    <p className="text-center text-xs mt-7">Don't have an account?<Link href="/signup" className="text-blue-800 pl-1">Sign Up</Link></p>
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