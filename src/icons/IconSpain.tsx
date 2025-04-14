import React from "react";
import { IconProps, IconWrapper } from "./IconWrapper";

type IconSpainProps = Omit<IconProps, "children">;

const IconSpain = React.forwardRef<SVGSVGElement, IconSpainProps>(
  ({ className, color, screenReaderText, size }, ref) => {
    return (
      <IconWrapper
        className={className}
        color={color}
        size={size}
        screenReaderText={screenReaderText}
      >
        <svg
          width="24"
          height="24"
          viewBox="0.25 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={ref}
        >
          <g clip-path="url(#clip0_376_287)">
            <path
              d="M0.253906 12.0001C0.253906 13.4679 0.517953 14.874 1.0003 16.174L12.2539 17.2175L23.5075 16.174C23.9899 14.874 24.2539 13.4679 24.2539 12.0001C24.2539 10.5322 23.9899 9.12618 23.5075 7.8262L12.2539 6.78271L1.0003 7.8262C0.517953 9.12618 0.253906 10.5322 0.253906 12.0001H0.253906Z"
              fill="#FFDA44"
            />
            <path
              d="M23.5072 7.82611C21.8117 3.25655 17.4132 0 12.2536 0C7.09403 0 2.69552 3.25655 1 7.82611H23.5072Z"
              fill="#D80027"
            />
            <path
              d="M1 16.1738C2.69552 20.7434 7.09403 23.9999 12.2536 23.9999C17.4132 23.9999 21.8117 20.7434 23.5072 16.1738H1Z"
              fill="#D80027"
            />
          </g>
          <defs>
            <clipPath id="clip0_376_287">
              <rect width="24" height="24" fill="white" transform="translate(0.253906)" />
            </clipPath>
          </defs>
        </svg>
      </IconWrapper>
    );
  },
);

IconSpain.displayName = "IconSpain";
export default IconSpain;
