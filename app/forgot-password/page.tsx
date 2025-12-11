"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import WorldMapDemo from "@/components/worldMap"
import { FaArrowLeft } from "react-icons/fa6";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState("");

    async function sendOtp(e: any) {
        e.preventDefault();

        const loading = toast.loading("Sending OTP ...");

        const res = await fetch("/api/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        toast.dismiss(loading);

        const data = await res.json();

        if (res.ok) {
            toast.success("OTP sent to email");
            setStep(2)
        } else {
            toast.error(data.error);
        }
    }

    async function verifyOtp(e: any) {
        e.preventDefault();

        const loading = toast.loading("verifying otp");

        const res = await fetch("/api/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ email, otp }),
        });

        toast.dismiss(loading);

        const data = await res.json();

        if (res.ok) {
            toast.success("OTP verified");
            window.location.href = `/reset-password?email=${email}`;
        } else {
            toast.error(data.error);
        }

    }
    return (
        <div className="w-full h-screen flex flex-col lg:flex-row bg-white  overflow-hidden dark:bg-black ">
            <div className="w-full lg:w-5/12 flex items-center justify-center p-6 lg:p-12 dark:bg-black">
                <div className="w-full max-w-md max-auto">
                    {step == 1 && (
                        <div>
                            <h2 className="text-center text-3xl font-bold mb-2">Reset your password</h2>
                            <p className="text-gray-500 text-sm text-center mb-10">Forogot your password? Please enter your email and we'll send you a 4-digit code. </p>
                            <form onSubmit={sendOtp} className="flex flex-col gap-4">
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

                                <button type="submit" className="w-full relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-sm cursor-pointer rounded-md shadow-zinc-900 transition-tranform duration-300 ease-in-out hover:scale-105 active:scale-95">
                                    <span className="absolute inset-0 rounded-md p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                    <span className="relative z-10 block px-6 py-3 rounded-md bg-gray-950 dark:bg-white dark:text-black">
                                        <div className="relative z-10 flex justify-center items-center space-x-2">
                                            <span className="transition-all duration-500 group-hover:transition-x-1 ">
                                                Get 6-digit code
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
                            <Link href="/login" className="flex items-center justify-center gap-2 text-sm hover:underline mt-7 text-neutral-500 pl-1"><FaArrowLeft />Back to log in</Link>
                        </div>
                    )}

                    {step == 2 && (
                        <div>
                            <h2 className="text-center text-3xl font-bold mb-2">Reset your password</h2>
                            <p className="text-gray-500 text-sm text-center mb-10">Forogot your password? Please enter your email and we'll send you a 4-digit code. </p>
                            <form onSubmit={verifyOtp} className="flex flex-col gap-4">
                                <div className="shadow-sm flex gap-2 items-center bg-white dark:bg-black p-2 duration-300 border-2 border-gray-400 group delay-200 rounded-md">
                                    <svg
                                        className="group-hover:rotate-[360deg] duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        height="1em"
                                        width="1em"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>

                                        <path d="M7 12h.01"></path>
                                        <path d="M12 12h.01"></path>
                                        <path d="M17 12h.01"></path>
                                    </svg>


                                    <input placeholder="6-digit OTP" type="text" maxLength={6} onChange={(e) => setOtp(e.target.value)} className="flex-1  focus:outline-none p-1 dark:bg-black dark:text-white" />
                                </div>

                                <button type="submit" className="w-full relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-sm cursor-pointer rounded-md shadow-zinc-900 transition-tranform duration-300 ease-in-out hover:scale-105 active:scale-95">
                                    <span className="absolute inset-0 rounded-md p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                    <span className="relative z-10 block px-6 py-3 rounded-md bg-gray-950 dark:bg-white dark:text-black">
                                        <div className="relative z-10 flex justify-center items-center space-x-2">
                                            <span className="transition-all duration-500 group-hover:transition-x-1 ">
                                                Get 6-digit code
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
                            <Link href="/login" className="flex items-center justify-center gap-2 text-sm hover:underline mt-7 text-neutral-500 pl-1"><FaArrowLeft />Back to log in</Link>
                        </div>
                    )}
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