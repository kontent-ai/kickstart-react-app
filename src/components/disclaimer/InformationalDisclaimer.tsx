import React from "react";
import DisclaimerBase from "./DisclaimerBase";

type InformationalDisclaimerProps = Readonly<{
  title: string;
  text: string;
}>;

const InformationalDisclaimer: React.FC<InformationalDisclaimerProps> = ({ title, text }) => (
  <DisclaimerBase title={title} text={text} theme="base" />
);

export default InformationalDisclaimer;
