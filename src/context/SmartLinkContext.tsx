import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import KontentSmartLink, {
  KontentSmartLinkEvent,
} from "@kontent-ai/smart-link";
import { useAppContext } from "./AppContext";
import { IRefreshMessageData, IRefreshMessageMetadata, IUpdateMessageData } from "@kontent-ai/smart-link/types/lib/IFrameCommunicatorTypes";

interface SmartLinkContextValue {
  readonly smartLink?: KontentSmartLink | null;
}

const defaultContextValue: SmartLinkContextValue = {
  smartLink: undefined,
};

const SmartLinkContext = createContext<SmartLinkContextValue>(defaultContextValue);

export const SmartLinkContextComponent: FC<PropsWithChildren> = ({ children }) => {
  const { environmentId } = useAppContext();
  const [smartLink, setSmartLink] = useState<KontentSmartLink | null>(null);

  useEffect(() => {
    console.log("initialize SmartLinkContext", environmentId);
    const instance = KontentSmartLink.initialize({
      defaultDataAttributes: {
        projectId: environmentId,
        languageCodename: "default",
      },
    });

    setSmartLink(instance);

    return () => {
      console.log("destroy SmartLinkContext", instance);
      smartLink?.destroy();
      setSmartLink(null);
    };
  }, [environmentId, smartLink]);

  const value = useMemo(() => ({ smartLink }), [smartLink]);

  return <SmartLinkContext.Provider value={value}>{children}</SmartLinkContext.Provider>;
};

export const useSmartLink = (): KontentSmartLink | null => {
  const { smartLink } = useContext(SmartLinkContext);

  if (typeof smartLink === "undefined") {
    throw new Error("You need to place SmartLinkProvider to one of the parent components to use useSmartLink.");
  }

  return smartLink;
};

export const useCustomRefresh = (
  callback: (data: IRefreshMessageData, metadata: IRefreshMessageMetadata, originalRefresh: () => void) => void,
): void => {
  const smartLink = useSmartLink();

  useEffect(() => {
    console.log("useCustomRefresh", smartLink);
    if (smartLink) {
      smartLink.on(KontentSmartLinkEvent.Refresh, callback);

      return () => {
        console.log("destroy useCustomRefresh", smartLink);
        smartLink.off(KontentSmartLinkEvent.Refresh, callback);
      };
    }

    return;
  }, [smartLink, callback]);
};

export const useLivePreview = (callback: (data: IUpdateMessageData) => void): void => {
  const smartLink = useSmartLink();

  useEffect(() => {
    if (smartLink) {
      console.log("useLivePreview", smartLink);
      smartLink.on(KontentSmartLinkEvent.Update, callback);

      return () => {
        console.log("destroy useLivePreview", smartLink);
        smartLink.off(KontentSmartLinkEvent.Update, callback);
      };
    }

    return;
  }, [smartLink, callback]);
};
