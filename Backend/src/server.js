import OpenAI from "openai"; 
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), '.env') });

import express from 'express';

const app = express();
const port = 3000

import {BASE_PROMPT,getSystemPrompt} from "./prompts.js"

const API_key = process.env.GPT_4_1; 
const token = API_key;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export async function main() {

  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const response = await client.chat.completions.create({
    messages: [
        { role:"system", content: `${BASE_PROMPT} + ${getSystemPrompt()}` },
        { role:"user", content: "create a todo app" }
      ],
      temperature: 1.0,
      top_p: 1.0,
      model: model,
      // max_tokens: 10000,
      stream:true,
    });

  for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        // res.write(`data: ${content}\n\n`);
        console.log(content);
      }
    }
}


app.get('/',(req,res)=>{
  res.send("HomePage")
})

app.listen(port,()=>{
  // console.log(`\n${API_key}`);
  console.log(`\nserver is listening on http://localhost:${port}`);

  main().catch((err) => {
    console.error("The sample encountered an error:", err);
  });

})