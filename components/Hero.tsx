import React from "react";
import RobotScene from "./RobotScene";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-[80vh] sm:h-[85vh] w-full overflow-hidden"
    >
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-12">
          <div className="w-1/2">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-bold leading-tight text-white"
            >
              I build RL systems, SLAM pipelines and robust control for
              autonomous robots.
            </motion.h1>
            <p className="mt-6 text-slate-300 max-w-lg">
              I design perception and control stacks that let robots learn and
              adapt — using reinforcement learning, probabilistic mapping, and
              resilient control strategies for real-world deployment.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#projects"
                className="px-5 py-3 rounded-lg bg-primary text-black font-semibold shadow-lg"
              >
                See Projects
              </a>
              <a href="#contact" className="px-5 py-3 rounded-lg glass">
                Get in touch
              </a>
            </div>
          </div>

          <div className="w-1/2 h-[60vh] sm:h-[65vh] relative rounded-2xl overflow-hidden border border-white/3 glass">
            <RobotScene />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#071124" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#071124" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g1)" />
        </svg>
      </div>
    </section>
  );
}
