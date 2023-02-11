import { formatJSONErrorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getProducts } from './products';
import schema from './schema';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const filter = event.queryStringParameters?.filter as unknown as string;
    const data = await getProducts(filter);
    if (!data.length) {
      throw new Error('Products not found with current filter');
    }
    return formatJSONResponse({
      data,
    });
  } catch (error) {
    return formatJSONErrorResponse({
      error: error.message,
    });
  }
};

export const main = middyfy(getProductsList);
