import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), '.env') });


import express from 'express';
const app = express();
const port = 3000;

import cors from 'cors'
app.use(cors())
app.use(express.json());

import { BASE_PROMPT, getSystemPrompt } from "./prompts.js"
import { log } from "console";
const API_key = process.env.GPT_4_1;
const token = API_key;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export async function main() {

}

app.post('/chat', async (req, res) => {

  const { userprompt } = req.body;
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });
  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: `${BASE_PROMPT} + ${getSystemPrompt()}` },
        { role: "user", content: userprompt }
      ],
      temperature: 1.0,
      top_p: 1.0,
      model: model,
      // max_tokens: 1000000,
      // stream: true,
    });


    // for await (const chunk of response) {
    //   const content = chunk.choices[0]?.delta?.content || "";
    //   if (content) {
    //     // res.write(`data: ${content}\n\n`);
    //     console.log(content);
    //   }
    // }

    const reply = response.choices[0]?.message?.content;
    console.log(reply);

    res.status(200).json({ reply });
  } catch (error) {
    
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
});

app.get('/', (req, res) => {
  res.send("Browser pe kuch to dikhe issliye me aagaya\n Hello members\n this is Backend")
})

app.listen(port, () => {
  // console.log(`\n${API_key}`);
  console.log(`\nserver is listening on http://localhost:${port}`);
})