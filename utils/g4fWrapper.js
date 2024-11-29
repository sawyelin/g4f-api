const g4f = require('g4f');

async function generateResponse(prompt, max_tokens, temperature, model) {
  try {
    const providerMap = {
      'gpt-3.5-turbo': g4f.Provider.OpenaiChat,
      'gpt-4': g4f.Provider.Bing,
      // Add more mappings as needed
    };

    const provider = providerMap[model] || g4f.Provider.OpenaiChat;

    const response = await g4f.ChatCompletion.create({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      provider: provider,
      max_tokens: max_tokens,
      temperature: temperature,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error in G4F:', error);
    throw new Error('Failed to generate response from G4F');
  }
}

module.exports = { generateResponse };

