"use client";

 import MapDashboardClient from "./MapDashboardClient";

 export default function MapDashboardRendered({
    serverData,
    totalPopulation,
    searchState,
    triggerSearch,
    clearTrigger
 }: any) {
    return (
        <MapDashboardClient
        serverData={serverData}
        totalPopulation={totalPopulation}
        searchState={searchState}
        triggerSearch={triggerSearch}
        clearTrigger={clearTrigger}
        />
    )
 }