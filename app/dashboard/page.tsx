import { getDashboardData } from "./mapDashboard";
import Sidebar from "../components/sidebar";
import MapDashboardRendered from "./MapDashboardRenderer";
import DashboardController from "./DashboardController";
import { getServerSession } from "next-auth";
import {redirect} from "next/navigation";

export default async function Page() {
    const session=await getServerSession();
    
    if(!session) {
        redirect("/login");
    }
    const data= await getDashboardData("");
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full">
        <DashboardController 
        serverData={data.serverData}
        totalPopulation={data.totalPopulation}
        />
      </div>
    </div>
  );
}
