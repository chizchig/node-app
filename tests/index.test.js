const request = require('supertest');
const express = require('express');
const app = express();

// Import the app logic from index.js
const setupApp = require('../src/index');

// Since index.js directly starts the server, we’ll mock it for testing
setupApp(app); // Pass the app instance to the setup logic

describe('Node.js App Tests', () => {
  it('GET / should return "Hello from Node.js!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello from Node.js!');
  });

  it('GET /nonexistent should return 404', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(404); // Express default behavior
  });
});