const express = require('express');

function setupApp(app) {
  app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
  });
}

// Only start the server if this file is run directly (not imported for testing)
if (require.main === module) {
  const app = express();
  setupApp(app);
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

module.exports = setupApp;