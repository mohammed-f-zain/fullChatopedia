import { Configuration, OpenAIApi } from "openai";
import express from "express";
import cors from "cors";

//init the port express and body parse
const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

//setup the openAi Config
const configuration = new Configuration({
  organization: "",
  apiKey: "",
});

//pass the config to the openai
const openai = new OpenAIApi(configuration);

//the post req and the end point link
app.post("/", async (req, res) => {
  const { chats } = req.body;

  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Welcome to Chatopedia , The world Will be a small Village",
      },
      ...chats,
    ],
  });
  res.json({
    output: result.data.choices[0].message,
  });
});

//create server and the end points
app.listen(port, () => {
  console.log(`listening at the port ${port}`);
});
