import * as express from "express";
import * as functions from "firebase-functions";
const builderFunction = functions.region("us-east1");
const httpBuilder = builderFunction.https;

import DiscussServiceClient from "@google-ai/generativelanguage";
import * as GoogleAuth from "google-auth-library";

// fetch github gist
import fetch from "node-fetch";
import {IExample, IMessage} from "./message-prompt.interface";

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.API_KEY || "";

const client = new DiscussServiceClient.DiscussServiceClient({
  authClient: new GoogleAuth.GoogleAuth().fromAPIKey(API_KEY),
});

const app = express();

app.use(function(req, res, next) {
  const corsOrigin = process.env.CORS_ORIGIN || "*";
  const reqOrigin = req.get("Origin");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", corsOrigin);
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,X-Access-Token");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  if (!reqOrigin?.startsWith(corsOrigin)) {
    res.status(403).send("Unforutnately, you're not able to access the api");
  } else {
    next();
  }
});

/**
 * fetch model json data
 * @return {any} model
 */
async function fetchModel() {
  // const random = Math.random();
  const response = await fetch("https://api.github.com/gists/f44ac364f01f8a2ec571dee7559f9ffb");
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json()
      .then((data) => data.files["personal-model-input"].content)
      .then((modelString) => JSON.parse(modelString))
      .catch(() => {
        return {
          examples: [],
          messages: [],
          context: "",
        };
      });
}


const getDefault = (req: express.Request, res: express.Response) => {
  fetchModel().then((model) => {
    client.generateMessage({
      // required, which model to use to generate the result
      model: MODEL_NAME,
      // optional, 0.0 always uses the highest-probability result
      temperature: 0.2,
      // optional, how many candidate results to generate
      candidateCount: 1,
      // optional, number of most probable tokens to consider for generation
      topK: 40,
      // optional, for nucleus sampling decoding strategy
      topP: 0.95,
      prompt: {
        // optional, sent on every request and prioritized over history
        context: model.context,
        // optional, examples to further finetune responses
        examples: model.examples as IExample[],
        // required, alternating prompt/response messages
        messages: model.messages as IMessage[],
      },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then((result: any) => {
      res.send(result[0].candidates[0].content);
    }).catch((error: Error) => { // Added error handling
      console.error("Error:", error);
      res.status(500).send("An error occurred while processing your request.");
    });
  });
};

app.get("/", getDefault);

const getNew = (req: express.Request, res: express.Response) => {
  fetchModel().then((model) => {
    const content = decodeURIComponent(req.query.message as string);
    // send message to server
    client.generateMessage({
      // required, which model to use to generate the result
      model: MODEL_NAME,
      // optional, 0.0 always uses the highest-probability result
      temperature: 0.2,
      // optional, how many candidate results to generate
      candidateCount: 1,
      // optional, number of most probable tokens to consider for generation
      topK: 40,
      // optional, for nucleus sampling decoding strategy
      topP: 0.95,
      prompt: {
        examples: model.examples,
        messages: [{
          content,
        }]},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then((result: any) => {
      res.send(result[0].candidates[0].content);
    }).catch((error: Error) => { // Added error handling
      console.error("Error:", error);
      res.status(500).send("An error occurred while processing your request.");
    });
  });
};

app.get("/new", getNew);

// api call /practice/ to firebase functions
export const practice = httpBuilder.onRequest(app);
