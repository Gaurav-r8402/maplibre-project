"use client";

import { useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import MapDashboardRendered from "./MapDashboardRenderer";

export default function DashboardController({ serverData, totalPopulation }: any) {
  const { searchState, trigger, clearTrigger}= useDashboard();

  return (
    <>
          <MapDashboardRendered
            serverData={serverData}
            totalPopulation={totalPopulation}
            searchState={searchState}
            triggerSearch={trigger}
            clearTrigger={clearTrigger}
          />
    </>
  );
}
