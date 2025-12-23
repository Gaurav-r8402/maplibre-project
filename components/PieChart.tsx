"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useTransform } from "framer-motion";

const COLORS = ["#4A70A9", "#E3E3E3"]; 

export default function PopulationPieChart({
  stateName,
  spopulation,
  cpopulation,
}: {
  stateName: string;
  spopulation: number;
  cpopulation: number;
}) {
  const data = [
    { name: "State Population", value: spopulation },
    { name: "Capital Population", value: cpopulation },
  ];

  

  return (
    <div className=" pt-10">

      <PieChart width={250} height={220}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={45}
          outerRadius={90}
          dataKey="value"
          isAnimationActive={true}
          animationBegin={200}        
          animationDuration={1200}    
          animationEasing="ease-out"  
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip formatter={(value, name) => [`${value.toLocaleString("en-In")}`, name]} />
        <Legend layout="horizontal" verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: "30px"}} />
      </PieChart>
      {/* <div className="flex justify-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-700 dark:text-gray-50">State is region, capital headquarters.</p>
        </div>
      </div> */}
    </div>
  );
}


