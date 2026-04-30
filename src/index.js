const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const killPort = require('kill-port');

require('dotenv').config();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3001;

(async () => {
  // Kill any existing process on the target port before binding
  try { await killPort(PORT, 'tcp'); } catch (_) {}
  // Give the OS a moment to fully release the port
  await new Promise(r => setTimeout(r, 300));

  const finalPort = PORT;
  console.log(`Starting server on port ${finalPort}…`);

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  // Routes
  app.use('/api/items', require('./routes/items'));
  app.use('/api/stats', require('./routes/stats'));
  app.use('/api/sanApiTest', require('./routes/sanApiTest'));


  // Static files (production only)
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  app.listen(finalPort, '0.0.0.0', async () => {
    console.log(`Backend running on http://localhost:${finalPort}`);

    try {
      const res = await fetch(`http://localhost:${finalPort}/api/sanApiTest`);
      const data = await res.json();
      console.log('[sanApiTest] response:', data);
    } catch (err) {
      console.error('[sanApiTest] failed to fetch:', err.message);
    }
  });
})();