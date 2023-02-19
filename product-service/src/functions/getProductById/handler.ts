import { formatJSONErrorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getProduct } from './products';
import schema from './schema';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const productId = event.pathParameters?.productId as unknown as string;
    const data = await getProduct(productId);
    if (!data) {
      return formatJSONErrorResponse({
        error: 'Product not found',
      });
    }
    return formatJSONResponse({
      ...data,
    });
  } catch (error) {
    return formatJSONErrorResponse(error);
  }
};

export const main = middyfy(getProductById, schema);
