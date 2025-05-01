import React from "react";
import DisclaimerBase from "./DisclaimerBase";

type InformationalDisclaimerProps = Readonly<{
  title: string;
  text: string;
  parentId: string;
  componentId: string | null;
}>;

const InformationalDisclaimer: React.FC<InformationalDisclaimerProps> = ({ title, text, parentId, componentId }) => (
  <DisclaimerBase title={title} text={text} theme="base" parentId={parentId} componentId={componentId} />
);

export default InformationalDisclaimer;