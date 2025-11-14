import React from "react";

export default function ProjectCard({
  title,
  desc,
  tags,
}: {
  title: string;
  desc: string;
  tags?: string[];
}) {
  return (
    <div className="glass p-6 rounded-2xl border border-white/3 shadow-xl">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-slate-300 text-sm">{desc}</p>
      <div className="mt-4 flex gap-2 flex-wrap">
        {tags?.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded-md bg-white/3">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
