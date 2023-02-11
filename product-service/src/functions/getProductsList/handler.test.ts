import { APIGatewayProxyResult, Context } from 'aws-lambda';
import { main } from './handler';
import { products } from './products';
import { createMockEventWithUser } from '@libs/mocks';
import schema from './schema';

describe('getProductsList', () => {
  test('should return products list correctly', async () => {
    const event = createMockEventWithUser({});

    const response = (await main(event, schema as unknown as Context)) as APIGatewayProxyResult;
    const result = JSON.parse(response.body);

    expect(result).toMatchObject({ data: products });
  });

  test('should return filtered products list correctly', async () => {
    const filteredData = products.filter((el) => el.menu === '1');
    const event = createMockEventWithUser({ queryParams: { filter: '1' } });

    const response = (await main(event, schema as unknown as Context)) as APIGatewayProxyResult;
    const result = JSON.parse(response.body);

    expect(result).toMatchObject({ data: filteredData });
  });

  test('should return error if provides wrong filter', async () => {
    const event = createMockEventWithUser({ queryParams: { filter: 'wrongFilter' } });

    const response = (await main(event, schema as unknown as Context)) as APIGatewayProxyResult;
    const result = JSON.parse(response.body);

    expect(result).toMatchObject({ error: 'Products not found with current filter' });
  });
});
