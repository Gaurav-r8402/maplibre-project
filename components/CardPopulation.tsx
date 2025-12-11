"use client"

import { FiArrowUpRight } from "react-icons/fi"
import AnimatedValue from "@/components/AnimatedNumber";
export default function CardPopulation({
    value,
    title,
}: {
    value: number,
    title: string,
}) {
    return (
        <div>
            <div
                className="flex justify-between items-center"
            >
                <p className="font-semibold text-[#16476A] dark:text-white" style={{ fontSize: 18 }}>
                    {title}
                </p>

                <FiArrowUpRight
                    className="text-4xl bg-[#16476A] text-[#FFFFF0] dark:bg-white dark:text-[#16476A]"
                    style={{
                        padding: 8,
                        borderRadius: 50,
                    }}
                />
            </div>

            <div className="font-bold text-[#16476A] dark:text-white p-5 pl-0" >
                <AnimatedValue  value={value} />
            </div>
        </div>
    )
}