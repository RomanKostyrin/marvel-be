export default {
  type: 'object',
  properties: {
    queryStringParameters: {
      type: 'object',
      properties: { filter: { type: 'string', minLength: 1 } },
    },
  },
} as const;
