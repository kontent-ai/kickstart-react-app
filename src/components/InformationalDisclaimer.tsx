import React from "react";

type InformationalDisclaimerProps = Readonly<{
  title: string;
  text: string;
}>;

const InformationalDisclaimer: React.FC<InformationalDisclaimerProps> = ({ title, text }) => {
  return (
    <div className="border-2 border-burgundy text-white pt-16 pb-20 rounded-lg">
      <h1 className="text-6xl text-azure font-serif text-center mb-6">{title}</h1>
      <p className="text-center text-gray text-lg max-w-4xl mx-auto">{text}</p>
    </div>
  );
};

export default InformationalDisclaimer;
