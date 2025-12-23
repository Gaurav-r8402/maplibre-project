"use client";

import Image from "next/image";
import { useState } from "react";

interface stateDataProps {
    stateName: string;
    spopulation: number;
    cpopulation: number;
    capital: string;
    famousThings?: string;
    famousImage?: string;
}

export default function Statedetailetable({ data }: { data: stateDataProps | null }) {
    if (!data) return null;
    console.log("📌 Incoming State Data:", data);
    const [open, setOpen] = useState(false);


    const { stateName, spopulation, cpopulation, capital, famousThings, famousImage } = data;

    const percentage = ((cpopulation / spopulation) * 100).toFixed(2) + "%";

    // const localImage=`/images/${stateName.replace(/ /g, "_")}.jpg`;
    const defaultImage = famousImage || `/images/default.png`;

    return (
        <div className="w-full">
            <div className="w-full rounded-2xl shadow-md overflow-hidden border">

                <div className="flex  text-left py-6">


                    <div className="flex-1 border-r-[3px] border-zinc-800 p-3">
                        <div className="p-3 text-sm">State</div>
                        <div className="p-3 font-semibold text-3xl">{stateName}</div>
                    </div>

                    <div className="flex-1 border-r-[3px] border-zinc-800 p-3">
                        <div className="p-3 text-sm">Image</div>
                        <div className="p-3 font-semibold text-3xl w-48 h-24 overflow-hidden rounded cursor-pointer">
                            <Image
                                src={defaultImage}
                                alt={stateName}
                                width={200}
                                height={40}
                                className="rounded object-cover"
                                onClick={() => setOpen(true)}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/images/default.jpg";
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex-1 border-r-[3px] border-zinc-800 p-3">
                        <div className="p-3 text-sm">State Percentage</div>
                        <div className="p-3 font-semibold text-3xl">{percentage}</div>
                    </div>

                    <div className="flex-1 border-r-[3px] border-zinc-800 p-3">
                        <div className="p-3 text-sm">Capital</div>
                        <div className="p-3 font-semibold text-3xl">{capital}</div>
                    </div>

                    {famousThings && (
                        <div className="flex-1 p-3">
                            <div className="p-3 text-sm">Famous For</div>
                            <div className="p-3 font-semibold text-3xl">{famousThings}</div>
                        </div>
                    )}

                </div>

            </div>
            {open && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]" onClick={() => setOpen(false)}>
                    <div
                        className="bg-white w-[90%] md:w-[70%] lg:w-[50%] h-[70%] rounded-2xl overflow-hidden shadow-2xl scale-75 opacity-0 animate-openApp"
                        onClick={(e) => e.stopPropagation()}>
                        <img
                            src={defaultImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    </div>

                </div>
            )}
        </div>

    )
}