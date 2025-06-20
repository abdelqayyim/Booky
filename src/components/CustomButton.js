import React from 'react';
import Tooltip from '@mui/material/Tooltip'; // Assuming you're using MUI for tooltips

const CustomButton = ({
  icon,
  onClick,
  tooltipTitle,
  tooltipPlacement = 'bottom',
  colorScheme = 'primary', // 'primary' | 'secondary' | 'custom'
  backgroundColor,
  hoverBackgroundColor,
  height = '40px',
  width = '40px',
}) => {
  // Handle color scheme classes or custom colors
  const isCustom = colorScheme === 'custom';

  const bgClass = isCustom
    ? ''
    : colorScheme === 'primary'
    ? 'bg-[var(--primary)] hover:bg-[var(--primary-hover)]'
    : 'bg-[var(--secondary)] hover:bg-[var(--secondary-hover)]';

  const style = isCustom
    ? {
        backgroundColor: backgroundColor,
        height: height,
        width: width,
      }
    : {
        height: height,
        width: width,
      };

  return (
    <Tooltip title={tooltipTitle} placement={tooltipPlacement}>
      <button
        onClick={onClick}
        className={`text-white rounded-md flex items-center justify-center ${bgClass}`}
        style={style}
      >
        {icon}
      </button>
    </Tooltip>
  );
};

export default CustomButton;
