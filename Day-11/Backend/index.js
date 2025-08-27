import { config } from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {PromptTemplate} from "@langchain/core/prompts"
config();


const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

// model.invoke("who are you?").then(res => console.log(res.content)
// ).catch(console.error);


const promptTemplate = PromptTemplate.fromTemplate(`
    Explain {topic} in a very simple way like ELI5,
    make sure to include the core concepts anmd avoid unnecessary jargon,
    make sure the answer as concise as possible
    `)

 // promptTemplate.invoke({topic: "express"}).then(res=>console.log(res.value))

 let chain = promptTemplate.pipe(model);
 chain.invoke({topic: "express"}).then(res=>console.log(res.content))
