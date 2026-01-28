export type RequestContext = Readonly<{
  readonly appInstanceId?: string;
  readonly authToken?: string;
}>;

export type CustomHeaders = Record<string, string>;

const makeHeaders = (requestContext?: RequestContext): CustomHeaders =>
  requestContext
    ? {
        ...(requestContext.authToken
          ? { Authorization: `Bearer ${requestContext.authToken}` }
          : {}),
        ...(requestContext.appInstanceId
          ? { "X-AppInstanceId": requestContext.appInstanceId }
          : {}),
      }
    : {};

export const get = async (url: string, requestContext: RequestContext) => {
  return await fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      ...makeHeaders(requestContext),
    },
    credentials: "same-origin",
  });
};

export const post = async (url: string, data: object, requestContext: RequestContext) => {
  return await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      ...makeHeaders(requestContext),
    },
    body: JSON.stringify(data),
    credentials: "same-origin",
  });
};
