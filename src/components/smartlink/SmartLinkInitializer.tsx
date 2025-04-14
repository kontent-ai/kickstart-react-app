import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import KontentSmartLink from "@kontent-ai/smart-link";

const SmartLinkInitializer: React.FC = () => {
  const { environmentId } = useAppContext();

  useEffect(() => {
    const sdk = KontentSmartLink.initialize({
      defaultDataAttributes: {
        projectId: environmentId,
        languageCodename: "default",
      },
    });

    return () => sdk.destroy();
  }, [environmentId]);

  return null;
};

export default SmartLinkInitializer;
