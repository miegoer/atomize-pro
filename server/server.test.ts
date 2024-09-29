import request from 'supertest';
import app from './index';
import client from './src/config/dbConfig';

const baseUrl = 'http://localhost:3000';

describe('server', () => {
  it('should return 200 for getAllTabs', async () => {
    const response = await request(app).get(`/api/tabs`);

    expect(response.statusCode).toBe(200);
  })

  afterAll(async () => {
    await client.end(); // Close the connection
  });
});