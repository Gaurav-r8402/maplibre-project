"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(0);

  const formatted = useTransform(count, latest =>
    Math.floor(latest).toLocaleString("en-IN")
  );

  useEffect(() => {
    animate(count, value, {
      duration: 1.2,
      ease: "easeOut"
    });
  }, [value]);

  return (
    <motion.div className="text-[#16476A] dark:text-white font-bold text-[45px]">
      <motion.span>{formatted}</motion.span>
    </motion.div>
  );
}
