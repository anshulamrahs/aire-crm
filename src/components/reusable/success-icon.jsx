import React from 'react';

const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100px"
    height="100px"
  >
    {/* Outer Circle with Larger Break */}
    <circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke="#00C853"
      strokeWidth="8"
      strokeDasharray="220,80"
    />
    
    {/* Inner White Circle */}
    <circle cx="50" cy="50" r="42" fill="#ffffff" />
    
    {/* Dots to Fill the Gap */}
    <circle cx="68" cy="7" r="4" fill="#00C853" />
    <circle cx="80" cy="15" r="4" fill="#00C853" />
    <circle cx="90" cy="26" r="4" fill="#00C853" />
    <circle cx="95" cy="41" r="4" fill="#00C853" />

    {/* Checkmark */}
    <path
      d="M30 50 L45 65 L70 35"
      stroke="#00C853"
      strokeWidth="8"
      fill="none"
    />
  </svg>
);

export default SuccessIcon;
