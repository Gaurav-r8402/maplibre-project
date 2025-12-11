"use client";

import { useState } from "react";
import DashboardClient from "./DashboardClient";
import MapDashboardRendered from "./MapDashboardRenderer";

export default function DashboardController({ serverData, totalPopulation}: any) {
  const [searchState, setSearchState] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);

  return (
    <>
      <DashboardClient
        setSearchState={setSearchState}
        triggerSearch={()=> setTriggerSearch(true)}
      />
      <div className="overflow-y-auto">
        <MapDashboardRendered
        serverData={serverData}
        totalPopulation={totalPopulation}
        searchState={searchState}
        triggerSearch={triggerSearch}
        clearTrigger={()=> setTriggerSearch(false)}
        />
      </div>
      
    </>
  );
}
