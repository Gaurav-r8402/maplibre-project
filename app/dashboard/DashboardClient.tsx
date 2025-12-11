"use client";

import Navbar from "../components/Navbar";

export default function DashboardClient({
  setSearchState,
  triggerSearch,
}: {
  setSearchState: (value: string) => void;
  triggerSearch: () => void;
}) {
  return (
    <Navbar
      onSearch={(value) => setSearchState(value)}
      onEnter={triggerSearch}
    />
  );
}
