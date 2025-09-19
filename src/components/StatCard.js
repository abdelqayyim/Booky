import React from "react";
import { METRICS_UP_SVG } from "../constants";

const StatCard = ({ card }) => {
  const hexToRGBA = (hex, alpha = 0.1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  return (
    <div
      className="h-full flex flex-col justify-between bg-[var(--component-primary)] rounded-[10px] p-[20px]
    shadow-[0_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-[5px]
    hover:shadow-[0px_5px_15px_rgba(0,0,0,0.1)] max-w-[300px]"
    >
      <div className="flex justify-between items-center mb-[15px]">
        <div className="text-[14px] font-semibold">{card.title}</div>
        <div
          className="flex flex-col items-center justify-center rounded text-[var(--primary)] w-[40px] h-[40px]"
          style={{ color: card.color, backgroundColor: hexToRGBA(card.color) }}
        >
          {card.logo}
        </div>
      </div>
      <div className="text-[24px] font-bold mb-[5px]">{card.value}</div>
      <div className="text-[var(--success)] flex flex-row gap-[2px] text-sm items-center">
        <div>{METRICS_UP_SVG}</div>
        <span>{card.metric}</span>
      </div>
    </div>
  );
};

export default StatCard;
