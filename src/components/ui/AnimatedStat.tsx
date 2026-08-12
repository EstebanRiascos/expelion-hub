"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface AnimatedStatProps {
  end: number;
  suffix?: string;
  title: string;
  decimals?: number;
}

export default function AnimatedStat({
  end,
  suffix = "",
  title,
  decimals = 0,
}: AnimatedStatProps) {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });


  return (
    <div
      ref={ref}
      className="text-center"
    >

      <h3 className="text-5xl font-bold tracking-tight text-violet-600 dark:text-violet-400 transition-colors duration-300">

        {inView ? (
          <CountUp
            end={end}
            duration={2}
            decimals={decimals}
          />
        ) : (
          0
        )}

        {suffix}

      </h3>


      <p className="mt-4 text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
        {title}
      </p>


    </div>
  );
}
