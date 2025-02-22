import React from "react";

export type IconProps = {
  height?: string;
  width?: string;
  color?: string;
  className?: string;
};

const ContactIcon: React.FC<IconProps> = ({
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
      className={className}
      viewBox="0 0 33 33.846"
    >
      <g id="Group_34" data-name="Group 34">
        <path
          id="Vector"
          d="M12.567,0A9.959,9.959,0,0,0,2.623,9.578H1.269a1.269,1.269,0,0,0,0,2.538H2.606v9.629H1.32a1.269,1.269,0,0,0,0,2.538H2.674a9.951,9.951,0,0,0,9.944,9.561h10.42A9.961,9.961,0,0,0,33,23.878V9.968A9.985,9.985,0,0,0,22.987,0ZM20.7,7.154a5.247,5.247,0,1,1-2.244-.5A5.24,5.24,0,0,1,20.7,7.154Zm2.779,18.7a1.269,1.269,0,0,1-.372-.9c0-2.048-2.555-3.808-4.652-3.808s-4.634,1.692-4.634,3.808a1.269,1.269,0,0,1-2.538,0c0-3.639,3.791-6.346,7.172-6.346s7.189,2.708,7.189,6.346a1.286,1.286,0,0,1-1.267,1.269A1.269,1.269,0,0,1,23.477,25.859Z"
          fill={color}
        />
        <path
          id="Vector-2"
          data-name="Vector"
          d="M4.634,4.61a2.708,2.708,0,1,1,.781-1.92A2.708,2.708,0,0,1,4.634,4.61Z"
          transform="translate(15.745 9.189)"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default React.memo(ContactIcon);
