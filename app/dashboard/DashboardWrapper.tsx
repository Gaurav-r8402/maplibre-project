"use client";

import { useState } from "react";
import DashboardClient from "./DashboardClient";

export default function DashboardWrapper({
    setSearchState,
    triggerSearch,
}: any) {
    return (
        <DashboardClient
            setSearchState={setSearchState}
            triggerSearch={triggerSearch}
        />
    );
}
