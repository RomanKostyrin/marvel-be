import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import type { Handler } from 'aws-lambda';

export const middyValidator = (schema: object) => {
  return validator({
    inputSchema: schema,
    ajvOptions: {
      verbose: true,
      messages: true,
      coerceTypes: false,
    },
  });
};

export const middyfy = (handler: Handler, schema: object) => {
  const middyfiedHandler = middy(handler).use(middyJsonBodyParser());

  return middyfiedHandler.use(middyValidator(schema));
};
