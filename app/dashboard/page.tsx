import { getDashboardData } from "./mapDashboard";
import Sidebar from "../components/sidebar";
import MapDashboardRendered from "./MapDashboardRenderer";
import DashboardController from "./DashboardController";
import { getServerSession } from "next-auth";
import {redirect} from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function Page() {
    const session=await getServerSession(authOptions);
    
    if(!session) {
        redirect("/login");
    }
    const data= await getDashboardData("");
  return (        
        <DashboardController 
        serverData={data.serverData}
        totalPopulation={data.totalPopulation}
        />
      
  );
}
