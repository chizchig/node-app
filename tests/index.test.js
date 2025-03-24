const request = require('supertest');
const express = require('express');
const setupApp = require('../src/index');

describe('Node.js App Tests', () => {
  let app;

  beforeEach(() => {
    app = express();
    setupApp(app); // Set up the app before each test
  });

  it('GET / should return "Hello from Node.js!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello from Node.js!');
  });

  it('GET /nonexistent should return 404', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(404);
  });
});