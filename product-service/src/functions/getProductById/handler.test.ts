import { APIGatewayProxyResult, Context } from 'aws-lambda';
import { main } from './handler';
import { createMockEventWithUser } from '@libs/mocks';
import schema from './schema';

describe('getProductById', () => {
  test('should return product by id correctly', async () => {
    const responseData = {
      description:
        'A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.), is conducting weapons tests overseas, but terrorists kidnap him to force him to build a devastating weapon. Instead, he builds an armored suit and upends his captors. Returning to America, Stark refines the suit and uses it to combat crime and terrorism.',
      id: 'ironMan',
      price: 24,
      title: 'Iron Man',
      menu: '1',
    };
    const event = createMockEventWithUser({ pathParams: { productId: 'ironMan' } });

    const response = (await main(event, schema as unknown as Context)) as APIGatewayProxyResult;
    const result = JSON.parse(response.body);

    expect(result).toMatchObject({ data: responseData });
  });

  test('should return erorr if product does not exist with provided id', async () => {
    const event = createMockEventWithUser({ pathParams: { productId: 'wrongId' } });

    const response = (await main(event, schema as unknown as Context)) as APIGatewayProxyResult;
    const result = JSON.parse(response.body);

    expect(result).toMatchObject({ error: 'Product not found' });
  });
});
