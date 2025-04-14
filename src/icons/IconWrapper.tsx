import React, { FC, ReactNode } from "react";

export type IconProps = {
  className?: string;
  color?: string;
  size?: number | string;
  screenReaderText?: string;
  children: ReactNode;
};

export const IconWrapper: FC<IconProps> = ({
  children,
  className = "",
  color = "currentColor",
  size = "1em",
  screenReaderText,
}) => {
  // You can use inline styles or Tailwind classes here.
  const style: React.CSSProperties = {
    color,
    fontSize: size,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <span className={`${className}`} style={style}>
      {children}
      {screenReaderText && <span className="sr-only">{screenReaderText}</span>}
    </span>
  );
};
