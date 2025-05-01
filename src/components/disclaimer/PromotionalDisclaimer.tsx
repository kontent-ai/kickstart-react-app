import React from "react";
import DisclaimerBase from "./DisclaimerBase";

type PromotionalDisclaimerProps = Readonly<{
  title: string;
  text: string;
  parentId: string;
  componentId: string | null;
}>;

const PromotionalDisclaimer: React.FC<PromotionalDisclaimerProps> = ({ title, text, parentId, componentId }) => (
  <DisclaimerBase title={title} text={text} parentId={parentId} componentId={componentId}  theme="burgundy" />
);

export default PromotionalDisclaimer;
