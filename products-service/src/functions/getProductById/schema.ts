export default {
  type: "object",
  properties: {
    pathParameters: {
      type: "object",
      properties: { productId: { type: "string", pattern: "^[\\d]+$" } },
      required: ["productId"],
    },
  },
  required: ["pathParameters"],
} as const;
