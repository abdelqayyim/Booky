import React from 'react';
export const SINGUP_SVG = (
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* User circle */}
      <circle cx="12" cy="8" r="4" fill="none" stroke="#3A0CA3" strokeWidth="2" />
  
      {/* User body shape */}
      <path
        d="M20 20c0-4.4-3.6-8-8-8s-8 3.6-8 8"
        fill="none"
        stroke="#3A0CA3"
        strokeWidth="2"
        strokeLinecap="round"
      />
  
      {/* Plus sign */}
      <circle cx="18" cy="18" r="5" fill="#F72585" />
      <path
        d="M18 15v6M15 18h6"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
);
export const LOGIN_SVG = (
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* User circle */}
      <circle cx="9" cy="9" r="4" fill="none" stroke="#3A0CA3" strokeWidth="2" />
  
      {/* User body shape (partial) */}
      <path
        d="M14 15c-1.3-1.3-3-2-5-2s-3.7.7-5 2"
        fill="none"
        stroke="#3A0CA3"
        strokeWidth="2"
        strokeLinecap="round"
      />
  
      {/* Arrow pointing into user area representing login */}
      <path
        d="M16 12h6M22 12l-3 -3M22 12l-3 3"
        fill="none"
        stroke="#4361EE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
  
      {/* Circle backdrop for visual balance */}
      <circle cx="18" cy="18" r="5" fill="#F72585" opacity="0.9" />
      <path
        d="M15 18h6M18 15l3 3-3 3"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
export const SUPPORT_SVG = (
    <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      {/* Headset circle */}
      <circle cx="12" cy="12" r="10" fill="none" stroke="#3A0CA3" strokeWidth="2" />
  
      {/* Headset shape */}
      <path
        d="M7 12v-2a5 5 0 0 1 10 0v2"
        fill="none"
        stroke="#3A0CA3"
        strokeWidth="2"
        strokeLinecap="round"
      />
  
      {/* Headset earpieces */}
      <path
        d="M5 12h2v4h-2a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z"
        fill="#4361EE"
        stroke="#3A0CA3"
        strokeWidth="1.5"
      />
      <path
        d="M19 12h-2v4h2a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2z"
        fill="#4361EE"
        stroke="#3A0CA3"
        strokeWidth="1.5"
      />
  
      {/* Speech bubble indicator */}
      <circle cx="12" cy="17" r="1" fill="#F72585" />
      <path d="M12 17v-2" stroke="#F72585" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
export const PRICING_SVG = (
    <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      {/* Dollar sign circle */}
      <circle cx="12" cy="12" r="10" fill="none" stroke="#3A0CA3" strokeWidth="2" />
  
      {/* Dollar sign */}
      <path
        d="M12 6v12M15 9.5c0-1.5-1.5-2.5-3-2.5s-3 1-3 2.5c0 1.5 1 2 3 3 2 1 3 1.5 3 3 0 1.5-1.5 2.5-3 2.5s-3-1-3-2.5"
        fill="none"
        stroke="#3A0CA3"
        strokeWidth="2"
        strokeLinecap="round"
      />
  
      {/* Price tags */}
      <circle cx="18" cy="6" r="2.5" fill="#F72585" />
      <path
        d="M18 6l-2.5 2.5"
        stroke="#F72585"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
  
      <circle cx="6" cy="18" r="2.5" fill="#4361EE" />
      <path
        d="M6 18l2.5-2.5"
        stroke="#4361EE"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
);
export const HOW_IT_WORKS_SVG = (
    <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      {/* Gear mechanism circle */}
      <circle cx="12" cy="12" r="10" fill="none" stroke="#3A0CA3" strokeWidth="2" />
  
      {/* Central gear */}
      <circle cx="12" cy="12" r="2" fill="#4361EE" stroke="#3A0CA3" strokeWidth="1.5" />
  
      {/* Gear teeth */}
      <path
        d="M12 5v2.5M12 16.5v2.5M5 12h2.5M16.5 12h2.5M7.4 7.4l1.8 1.8M14.8 14.8l1.8 1.8M7.4 16.6l1.8-1.8M14.8 9.2l1.8-1.8"
        fill="none"
        stroke="#3A0CA3"
        strokeWidth="2"
        strokeLinecap="round"
      />
  
      {/* Movement indicator */}
      <path
        d="M12 12L18 12"
        fill="none"
        stroke="#F72585"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="10s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
);