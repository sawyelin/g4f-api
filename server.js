const express = require('express');
const bodyParser = require('body-parser');
const { handleCompletions } = require('./routes/completions');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Mimic OpenAI API endpoint
app.post('/v1/completions', handleCompletions);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

