const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { handleCompletions } = require('./routes/completions');
const { handleHealthCheck } = require('./routes/healthCheck');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.post('/v1/completions', handleCompletions);
app.get('/v1/health', handleHealthCheck);

// Serve documentation
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      message: 'An unexpected error occurred',
      type: 'internal_server_error'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

