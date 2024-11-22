export type RequestContext = Readonly<{
  readonly appInstanceId?: string;
  readonly authToken?: string;
}>;

export type CustomHeaders = Record<string, string>;

const makeHeaders = (requestContext?: RequestContext): CustomHeaders =>
  requestContext
    ? {
      ...requestContext.authToken ? { Authorization: `Bearer ${requestContext.authToken}` } : {},
      ...requestContext.appInstanceId ? { "X-AppInstanceId": requestContext.appInstanceId } : {},
    }
    : {};

export const get = (url: string, requestContext: RequestContext) => {
  return fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      ...makeHeaders(requestContext),
    },
    credentials: "same-origin",
  });
};

export const post = (url: string, data: object, requestContext: RequestContext) => {
  return fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      ...makeHeaders(requestContext),
    },
    body: JSON.stringify(data),
    credentials: "same-origin",
  });
};
