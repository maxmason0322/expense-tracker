"use client";

import { animated } from "@react-spring/web";
import useBoop from "@/app/hooks/use-boop";
import { ReactNode } from "react";

interface SpringConfig {
  tension: number;
  friction: number;
}

interface BoopConfig {
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
  timing?: number;
  springConfig?: SpringConfig;
}

interface BoopProps extends BoopConfig {
  children: ReactNode;
}

export default function Boop({ children, ...boopConfig }: BoopProps) {
  const [style, trigger] = useBoop(boopConfig);

  return (
    // @ts-expect-error
    <animated.span onMouseEnter={trigger} style={style}>
      {children}
    </animated.span>
  );
}
