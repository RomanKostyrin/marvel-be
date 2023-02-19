import { APIGatewayProxyEvent } from 'aws-lambda';
import { JsonValue } from 'type-fest';

type Event = Omit<APIGatewayProxyEvent, 'body'> & { body: JsonValue; rawBody: string };

export function createMockEventWithUser<T = Event>(params?: {
  headers?: Record<string, string>;
  body?: Record<string, unknown> | unknown[];
  queryParams?: Record<string, unknown>;
  pathParams?: Record<string, unknown>;
  requestContext?: Record<string, unknown>;
}): T {
  return {
    body: Array.isArray(params?.body) ? [...((params?.body as unknown[]) ?? [])] : { ...params?.body },
    headers: {
      ...params?.headers,
    },
    pathParameters: params?.pathParams ?? {},
    queryStringParameters: params?.queryParams ?? {},
    requestContext: {
      apiId: 'apiId',

      ...params?.requestContext,
    },
  } as unknown as T;
}
