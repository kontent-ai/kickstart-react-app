import React from "react";

type DisclaimerBaseProps = Readonly<{
  title: string;
  text: string;
  theme: "burgundy" | "base";
}>;

const DisclaimerBase: React.FC<DisclaimerBaseProps> = ({ title, text, theme }) => {
  return (
    <div className={`${theme === "burgundy" ? "burgundy-theme" : ""} bg-background-color pt-16 pb-20 rounded-lg`}>
      <h1 className="text-6xl text-heading-2-color font-serif text-center mb-6">{title}</h1>
      <p className="text-center text-body-color text-lg max-w-4xl mx-auto">{text}</p>
    </div>
  );
};

export default DisclaimerBase;
