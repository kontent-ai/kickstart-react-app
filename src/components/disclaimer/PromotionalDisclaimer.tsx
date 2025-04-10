import React from "react";
import DisclaimerBase from "./DisclaimerBase";

type PromotionalDisclaimerProps = Readonly<{
  title: string;
  text: string;
}>;

const PromotionalDisclaimer: React.FC<PromotionalDisclaimerProps> = ({ title, text }) => (
  <DisclaimerBase title={title} text={text} theme="burgundy" />
);

export default PromotionalDisclaimer;
