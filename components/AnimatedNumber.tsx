"use client"

import AnimatedNumbers from "react-animated-numbers"
export default function AnimatedNumber({
    value,
}: {
    value: number
}) {
    return (
        <div className="text-[#16476A] dark:text-white font-bold text-[45px]">
            <AnimatedNumbers
                useThousandsSeparator
                animateToNumber={value}
                transitions={(index) => ({
                    type: "spring",
                    damping: 20,
                    stiffness: 120,
                    mass: 0.2,
                })}
            />
        </div>

    );
}