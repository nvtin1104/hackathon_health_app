import axios from 'axios';
export const getAnswerFromAI  = async (question) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-4o',
              messages: [
                {
                  role: 'user',
                  content: question
                }
              ],
              max_tokens: 3896
            },
            {
              headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
              }
            }
          );
        return response.data.choices[0].message.content;
    } catch(error) {
        console.error(error.message);
       return null
    }
}
