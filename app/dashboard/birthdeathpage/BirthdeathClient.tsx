"use client";

import { useEffect, useState } from "react";
import BirthDeathBarChart from "@/components/BirthDeathBarChart";
import StateMap from "@/components/StateMap";


type stateData = {
    state: string;
    birth_rate: number;
    death_rate: number;
};

export default function DemographicsClient() {
    const [states, setStates] = useState<stateData[]>([]);
    const [selectedState, setSelectedState] = useState<stateData | null>(null);

    useEffect(() => {
        fetch("/data/state_demographics.json")
            .then((res) => res.json())
            .then((json) => setStates(json.states));
    }, []);

    return (
        <div className="p-6 space-y-6 dark:bg-[black] bg-white">
            <div className="relative">

                <select className="block w-full px-4 shadow-md py-4 appearance-none text-sm text-gray-700  bg-gray-50  dark:bg-[#121212] dark:text-white border border-zinc-600 rounded-lg focus:ring-zinc-800 focus:border-zinc-800" value={selectedState?.state ?? ""}
                    onChange={(e) => {
                        setSelectedState(
                            states.find((s) => s.state === e.target.value) || null
                        )
                    }}
                >
                    <option value="">Select State</option>
                    {states.map((s) => (
                        <option key={s.state} value={s.state}>
                            {s.state}
                        </option>
                    ))}
                </select>
                <svg className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 pointer-events-none text-gray-700 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </div>


            {/* {!selectedState && (
                <p className="text-gray-500">Please select a state to view</p>
                )} */}

            {selectedState ? (
                <>
                    <div className="grid grid-cols-12 gap-4 p-2">
                        <div className="col-span-12 lg:col-span-8 h-[500px] rounded-xl bg-[#D3DAD9] dark:bg-[#121212] border-2 border-zinc-800 shadow-md  overflow-hidden">
                            <div className="">
                                <StateMap stateName={selectedState.state} />
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4  overflow-hidden">
                            <BirthDeathBarChart
                                stateName={selectedState.state}
                                birthRate={selectedState.birth_rate}
                                deathRate={selectedState.death_rate}
                            />
                        </div>

                        {/* <HeatMap stateData={selectedState} /> */}
                    </div>
                </>
            ) : (
                <div className="relative">
                <div className="grid grid-cols-12 gap-4 p-4 px-0">
                    <div className="col-span-12 lg:col-span-8 h-[480px] rounded-xl bg-gray-200 dark:bg-[#121212] shadow-md" />
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
                        <div className="dark:bg-[#121212] p-4 h-[480px] rounded-xl border shadow-md">
                            <div className="h-20 w-full p-2 bg-gray-300 dark:bg-zinc-800 rounded mb-3"></div>
                            <div className="h-[340px] w-full p-2 bg-gray-300 dark:bg-zinc-800 rounded"></div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 font-semibold text-lg shadow-lg rounded-lg bg-white dark:bg-zinc-800 dark:border-zinc-600 border w-2/4 text-center">
                    <p>Select the state to display</p>
                </div>
            </div>
            )}
        </div>
    )
}