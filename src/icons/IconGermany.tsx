import React from "react";
import { IconProps, IconWrapper } from "./IconWrapper";

type IconGermanyProps = Omit<IconProps, "children">;

const IconGermany = React.forwardRef<SVGSVGElement, IconGermanyProps>(
  ({ className, color, screenReaderText, size }, ref) => {
    return (
      <IconWrapper className={className} color={color} size={size} screenReaderText={screenReaderText}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ref={ref}>
          <g clip-path="url(#clip0_250_634)">
            <path
              d="M0.746094 16.1739C2.44161 20.7435 6.84012 24 11.9997 24C17.1593 24 21.5578 20.7435 23.2533 16.1739L11.9997 15.1305L0.746094 16.1739Z"
              fill="#FFDA44"
            />
            <path
              d="M11.9997 0C6.84012 0 2.44161 3.2565 0.746094 7.82611L11.9997 8.86955L23.2533 7.82606C21.5578 3.2565 17.1593 0 11.9997 0Z"
              fill="black"
            />
            <path
              d="M0.746391 7.82605C0.264047 9.12603 0 10.5321 0 11.9999C0 13.4678 0.264047 14.8738 0.746391 16.1738H23.2537C23.736 14.8738 24 13.4678 24 11.9999C24 10.5321 23.736 9.12603 23.2536 7.82605H0.746391Z"
              fill="#D80027"
            />
          </g>
          <defs>
            <clipPath id="clip0_250_634">
              <rect width="24" height="24" rx="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </IconWrapper>
    );
  },
);

IconGermany.displayName = "IconGermany";
export default IconGermany;
