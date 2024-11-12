import { get, post, RequestContext } from "./fetch";

type LoadPreviewApiKeyDeps = Readonly<{
  accessToken: string;
  environmentId: string;
}>;

type ProjectContainer = Readonly<{
  projectContainerId: string;
}>;

type TokenSeedResponse = Readonly<{
  token_seed_id: string;
}>;

type KeyFromSeedResponse = Readonly<{
  api_key: string;
}>;

export const loadPreviewApiKey = async ({ accessToken, environmentId }: LoadPreviewApiKeyDeps) => {
  const projectContainerId = await getProjectContainerForEnvironment(accessToken, environmentId)
    .then(res => res?.projectContainerId);

  if (!projectContainerId) {
    return null;
  }

  const tokenSeed = await getPreviewApiTokenSeed(accessToken, projectContainerId, environmentId).then(res =>
    res?.[0]?.token_seed_id
  );

  if (!tokenSeed) {
    return null;
  }

  return getKeyForTokenSeed(accessToken, projectContainerId, tokenSeed)
    .then(response => response.api_key)
    .catch(() => null);
};

export const getProjectContainerForEnvironment = (
  authToken: string,
  environmentId: string,
): Promise<ProjectContainer | null> => {
  const requestContext: RequestContext = { authToken };
  const url = `${import.meta.env.VITE_KONTENT_URL}/api/project-management/${environmentId}`;

  return get(url, requestContext)
    .then(async (res) => {
      if (res.ok) {
        return await res.json() as ProjectContainer;
      }

      console.error((await res.json()).description);
      return null;
    });
};

export const getPreviewApiTokenSeed = (
  authToken: string,
  projectContainerId: string,
  environmentId: string,
): Promise<ReadonlyArray<TokenSeedResponse> | null> => {
  const requestContext: RequestContext = {
    authToken: authToken,
  };
  const url = `${import.meta.env.VITE_KONTENT_URL}/api/project-container/${projectContainerId}/keys/listing`;
  const data = {
    query: "",
    api_key_types: ["delivery-api"],
    environments: [environmentId],
  };

  return post(url, data, requestContext)
    .then(async res => {
      if (!res.ok) {
        console.error((await res.json()).description);
        return null;
      }

      const tokens = await res.json() as TokenSeedResponse[];

      if (!tokens.length) {
        console.error(`There is no Delivery API key for environment ${environmentId}`);
        return null;
      }

      return tokens;
    });
};

export const getKeyForTokenSeed = (
  authToken: string,
  projectContainerId: string,
  tokenSeed: string,
): Promise<KeyFromSeedResponse> => {
  const requestContext: RequestContext = {
    authToken: authToken,
  };
  const url = `${import.meta.env.VITE_KONTENT_URL}/api/project-container/${projectContainerId}/keys/${tokenSeed}`;

  return get(url, requestContext).then(res => res.json());
};
