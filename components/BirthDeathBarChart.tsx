"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";

import { FaInfoCircle } from "react-icons/fa";


const barValueLabel = (value: any) => {
  if (value == null) return "";
  return String(value);
};


type ChartData = {
  name: string;
  birth: number;
  death: number;
};

const renderLabel = (value: number) => {
  return value.toString();
};

export default function BirthDeathBarChart({
  stateName,
  birthRate,
  deathRate,
}: {
  stateName: string;
  birthRate: number;
  deathRate: number;
}) {
  const data: ChartData[] = [
    {
      name: stateName,
      birth: birthRate,
      death: deathRate,
    },
  ];

  return (
    <div className="w-full h-[500px] dark:bg-zinc-900 bg-gray-50 shadow-md dark:border-0 border border-zinc-700 rounded-md p-4">
      <div className="flex items-center justify-between px-3">
        <h2 className="text-2xl font-bold">Birth & Death Rates <span><br />by State</span></h2>
        <span className="text-2xl dark:text-white"><FaInfoCircle /></span>
      </div>
      <ResponsiveContainer width="100%" height={350} className="mt-6">
        <BarChart
          data={data}
          margin={{ top: 30, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="birth"
            fill="#134686"
            name="Birth Rate"
            minPointSize={5}
          >
            <LabelList dataKey="birth" position="top" formatter={barValueLabel} />
          </Bar>

          <Bar
            dataKey="death"
            fill="#94B4C1"
            name="Death Rate"
            minPointSize={5}
          >
            <LabelList dataKey="death" position="top" formatter={barValueLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
