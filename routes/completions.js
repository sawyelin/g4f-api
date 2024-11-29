const { generateResponse } = require('../utils/g4fWrapper');

async function handleCompletions(req, res) {
  try {
    const { prompt, max_tokens = 100, temperature = 0.7, model = 'gpt-3.5-turbo' } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: {
          message: 'Prompt is required',
          type: 'invalid_request_error',
          param: 'prompt',
          code: null
        }
      });
    }

    const response = await generateResponse(prompt, max_tokens, temperature, model);

    res.json({
      id: `g4f-${Date.now()}`,
      object: 'text_completion',
      created: Math.floor(Date.now() / 1000),
      model: model,
      choices: [
        {
          text: response,
          index: 0,
          logprobs: null,
          finish_reason: 'stop'
        }
      ],
      usage: {
        prompt_tokens: prompt.split(' ').length,
        completion_tokens: response.split(' ').length,
        total_tokens: prompt.split(' ').length + response.split(' ').length
      }
    });
  } catch (error) {
    console.error('Error in completions:', error);
    res.status(500).json({
      error: {
        message: 'An error occurred during text generation',
        type: 'text_generation_error',
        param: null,
        code: null
      }
    });
  }
}

module.exports = { handleCompletions };

