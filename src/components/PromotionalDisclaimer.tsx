import React from "react";

type PromotionalDisclaimerProps = Readonly<{
  title: string;
  text: string;
}>;

const PromotionalDisclaimer: React.FC<PromotionalDisclaimerProps> = ({ title, text }) => {
  return (
    <div className="bg-burgundy text-white pt-16 pb-20 rounded-lg">
      <h1 className="text-6xl text-creme font-serif text-center mb-6">{title}</h1>
      <p className="text-center text-creme text-lg max-w-4xl mx-auto">{text}</p>
    </div>
  );
};

export default PromotionalDisclaimer;
