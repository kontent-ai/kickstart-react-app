import type { FC, PropsWithChildren } from "react";

type KontentComponentErrorMessageProps = PropsWithChildren<{
  errorMessageClassName?: string;
}>;

const KontentComponentErrorMessage: FC<KontentComponentErrorMessageProps> = (props) => (
  <p className={`text-balance font-sans text-xl text-gray ${props.errorMessageClassName ?? ""}`}>
    {props.children}
  </p>
);

export default KontentComponentErrorMessage;
