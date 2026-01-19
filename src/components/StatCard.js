import React from "react";
import { METRICS_UP_SVG } from "../constants";

const StatCard = ({ card }) => {
  const hexToRGBA = (hex, alpha = 0.1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

const numberValue = (value, type, sign) => {
  // Validate input
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error("Value must be a valid number");
  }

  const validTypes = ["float", "integer", "percentage"];
  if (!validTypes.includes(type)) {
    throw new Error(`Invalid type. Expected one of: ${validTypes.join(", ")}`);
  }

  const validSigns = ["positive", "negative"];
  if (!validSigns.includes(sign)) {
    throw new Error(`Invalid sign. Expected one of: ${validSigns.join(", ")}`);
  }

  // Determine color classes based on sign
  const positiveColor = "bg-green-900/30 text-green-600 dark:bg-green-900/30 dark:text-green-400";
  const negativeColor = "bg-red-900/30 text-red-600 dark:bg-red-900/30 dark:text-red-400";
  const colorClass = sign === "positive" ? positiveColor : negativeColor;

  // Determine display value
  let displayValue = value;

  if (type === "percentage") {
    displayValue = `${value}%`;
  } else if (type === "float") {
    displayValue = value.toFixed(2);
  } else if (type === "integer") {
    displayValue = Math.round(value);
  }

  // Add sign
  const elementSign = sign === "positive" ? "+" : "-";
  const finalValue = `${elementSign}${displayValue}`;

  return (
    <div className={`text-xs font-bold px-2 py-1 rounded-lg ${colorClass}`}>
      {finalValue}
    </div>
  );
};

  return (
    <div>
      <div class="bento-card bg-[var(--bg-secondary)] dark:bg-slate-900 p-6 rounded-2xl border border-[var(--bg-primary)] dark:border-slate-700 shadow-sm flex flex-col justify-between">
<div class="flex justify-between items-start">
<div>
<p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Occupancy Rate</p>
<h3 class="text-3xl font-bold text-[var(--text-primary)] mt-1">89%</h3>
</div>
<div class="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded-lg">
                                Stable
                            </div>
</div>
<div class="mt-4 flex items-center gap-1 text-xs text-slate-400">
<span class="material-symbols-outlined text-sm">{METRICS_UP_SVG}</span>
<span>Average per unit</span>
</div>
</div>
    </div>
  );
};

export default StatCard;
