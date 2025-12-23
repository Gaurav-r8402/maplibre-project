"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Statedetailetable from "./StateDetailsTable";
import CardPopulation from "@/components/CardPopulation";
import PieChart from "@/components/PieChart";
import { clear } from "console";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";


const IndiaMap = dynamic(() => import("@/components/MapLibreMap"), { ssr: false });

export default function MapDashboardClient({
  serverData,
  totalPopulation,
  searchState,
  triggerSearch,
  clearTrigger
}: {
  serverData: any;
  totalPopulation: number;
  searchState: string;
  triggerSearch: boolean;
  clearTrigger: () => void;
}) {
  const [stateData, setStateData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  console.log("search props", { searchState, triggerSearch });

  return (
    <div className="w-full">
      <div className="relative ">

        {loading && (
          <div className="absolute inset-0 z-10 bg-white dark:bg-black">
            <DashboardSkeleton />
          </div>
        )}
        <div className="grid grid-cols-12 gap-4 p-4">

          <div className="col-span-12 lg:col-span-8 h-[600px] rounded-xl border shadow-md relative overflow-hidden">


            <div className="absolute inset-0">
              <IndiaMap
                serverData={serverData}
                searchState={searchState}
                triggerSearch={triggerSearch}
                clearTrigger={clearTrigger}
                onStateClick={setStateData}
                onMapLoaded={() => {
                  // console.log("📣 Parent received onMapLoaded()");
                  setLoading(false);
                }}
              />
            </div>

          </div>


          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
            <div className=" dark:bg-zinc-800 p-4 rounded-xl border shadow-md">

              <CardPopulation
                title={stateData ? `${stateData.stateName} Population` : "Total Population"}
                value={stateData?.spopulation ?? totalPopulation}
              />

            </div>
            <div className=" dark:bg-zinc-800 h-full rounded-xl border shadow-md">
              <div className="p-4 text-xl border-b-[1px] border-gray-100 dark:border-zinc-500 flex justify-between items-center font-semibold">
                {stateData ? `${stateData.stateName}` : "Select State"}
                <p className="hover:underline text-zinc-500 text-sm cursor-pointer font-normal">view more</p>
              </div>
              <div className="flex items-center justify-center pt-4">
                {stateData && (
                  <PieChart
                    stateName={stateData.stateName}
                    spopulation={stateData.spopulation}
                    cpopulation={stateData.cpopulation}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-span-12 flex flex-col gap-4 mt-3">
            {stateData && (

              <Statedetailetable data={stateData} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
