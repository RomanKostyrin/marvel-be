export default {
  type: 'object',
  properties: {
    queryStringParameters: {
      type: 'object',
      properties: { filter: { type: 'string' } },
    },
  },
} as const;
