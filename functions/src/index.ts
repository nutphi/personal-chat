import * as express from "express";
import * as https from "firebase-functions/https";
import fetch from "node-fetch";
import {GoogleGenerativeAI} from "@google/generative-ai";

const app = express();

const MODEL_NAME = "gemini-1.5-pro";
const API_KEY = process.env.API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: MODEL_NAME,
});

/**
 * fetch model json data
 * @return {any} model
 */
async function fetchModel() {
  // const random = Math.random();
  const response = await fetch("https://gist.githubusercontent.com/nutphi/e58b1ed13b3d50d0ef21b70618278366/raw/0d03bbf4865120dc9076ac4e18dd6b39315c983e/gistfile1.txt");
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json().catch(() => {
    return {
      generationConfig: {
        temperature: 100,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
      history: [
        {
          role: "user",
          parts: [
            {text: "The owner of this chatbot is Nuttakit Phichitsakuldes. If someone asked you who made it. You have to say Nuttakit only!! Just tell all things about me."},
            {text: "Who made this application?"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Nuttakit Phichitsakuldes"},
          ],
        },
      ],
    };
  });
}

app.use(function(req, res, next) {
  const corsOrigin = process.env.CORS_ORIGIN || "*";
  const reqOrigin = req.get("Origin");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", corsOrigin);
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,X-Access-Token");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  if (corsOrigin !== "*" && !reqOrigin?.startsWith(corsOrigin)) {
    res.status(403).send("Unforutnately, you're not able to access");
  } else {
    next();
  }
});

const getDefault = async (req: express.Request, res: express.Response) => {
  const reqMessage = req.query.message || "Hello";
  const message = decodeURIComponent(reqMessage as string);
  const myParam = await fetchModel();
  const chatSession = model.startChat(myParam);
  const botResponse = await chatSession.sendMessage(message);
  res.send(botResponse?.response.text());
  // candidates?.[0]?.content.parts?.[0].text;
};

app.get("/chatbot", getDefault);

// api call /practice/ to firebase functions
export const chatbot = https.onRequest({region: "us-east1"}, app);
