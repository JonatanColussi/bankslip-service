import { APIGatewayProxyResult } from 'aws-lambda';

export function response(data: Record<string, any>, statusCode?: number) {
  return Promise.resolve({
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'Application/json',
    },
    statusCode: statusCode || 200,
  } as APIGatewayProxyResult);
}
