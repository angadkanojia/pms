import React from "react";

export type IconProps = {
  height?: string;
  width?: string;
  color?: string;
  className?: string;
};

const DashboardIcon: React.FC<IconProps> = ({
  width = "20",
  height = "20",
  color = "rgb(76,76,76)",
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 33 33"
      className={className}
    >
      <g id="Group_33" data-name="Group 33">
        <path
          id="Vector"
          d="M13.458,19.542a4.125,4.125,0,0,1,1.208,2.917v6.417A4.125,4.125,0,0,1,10.542,33H4.125A4.125,4.125,0,0,1,0,28.875V22.458a4.125,4.125,0,0,1,4.125-4.125h6.417A4.125,4.125,0,0,1,13.458,19.542ZM31.792,1.208A4.125,4.125,0,0,1,33,4.125v6.417a4.125,4.125,0,0,1-4.125,4.125H22.458a4.125,4.125,0,0,1-4.125-4.125V4.125A4.125,4.125,0,0,1,22.458,0h6.417A4.125,4.125,0,0,1,31.792,1.208Z"
          fill={color}
          opacity="0.3"
        />
        <path
          id="Vector-2"
          data-name="Vector"
          d="M13.458,1.208a4.125,4.125,0,0,1,1.208,2.917v6.417a4.125,4.125,0,0,1-4.125,4.125H4.125A4.125,4.125,0,0,1,0,10.542V4.125A4.125,4.125,0,0,1,4.125,0h6.417A4.125,4.125,0,0,1,13.458,1.208Z"
          fill={color}
        />
        <path
          id="Vector-3"
          data-name="Vector"
          d="M13.458,1.208a4.125,4.125,0,0,1,1.208,2.917v6.417a4.125,4.125,0,0,1-4.125,4.125H4.125A4.125,4.125,0,0,1,0,10.542V4.125A4.125,4.125,0,0,1,4.125,0h6.417A4.125,4.125,0,0,1,13.458,1.208Z"
          transform="translate(18.333 18.333)"
          fill={color}
          opacity="0.3"
        />
      </g>
    </svg>
  );
};

export default React.memo(DashboardIcon);
