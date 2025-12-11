import { getMapData } from "@/lib/getMapData";
import IndiaData from "@/public/data/IndiaCapital.json";

export async function getDashboardData(searchState: string) {
  const serverData = await getMapData();

  const totalPopulation = IndiaData.features.reduce(
    (sum, f) => sum + Number(f.properties.spopulation || 0),
    0
  );

  return {
    serverData,
    totalPopulation,
    searchState,
  };
}
