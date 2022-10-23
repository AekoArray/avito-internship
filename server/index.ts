import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import {
  BACKEND_ROUTES,
  HACKER_NEWS_API_BASE_URL,
  HACKER_NEWS_API_URL_SUFFIX,
  HACKER_NEWS_STORIES_LIMIT,
} from "./constants";
import { Story } from "./types";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get(BACKEND_ROUTES.NEWS, async (req, res) => {
  const url = `${HACKER_NEWS_API_BASE_URL}newstories${HACKER_NEWS_API_URL_SUFFIX}`;
  console.log(url);
  const response = await axios.get(url);
  if (response.status === 200 && response.data) {
    if (Array.isArray(response.data)) {
      const slicedIDs = response.data.slice(0, HACKER_NEWS_STORIES_LIMIT);
      const data = await getStoriesByIDs(slicedIDs);
      // const data = await getStoriesByIDsSlow(slicedIDs);
      res.json({ message: data });
    }
  }

  res.json({ message: "", error: "error" });
});

const getStoriesByIDs = async (
  storiesIDs: number[]
): Promise<(Story | null)[]> => {
  const result: (Story | null)[] = [];
  const start = Date.now();
  const res: Promise<Story | null>[] = [];
  for (let i = 0; i < storiesIDs.length; i++) {
    const res1: Promise<Story | null> = getStoryById(storiesIDs[i]);
    res.push(res1);
  }

  for (const promise of res) {
    const story: Story | null = await promise;
    result.push(story);
  }

  const end = Date.now();
  console.log("Fast: ", (end - start) / 1000);
  return result;
};

const getStoriesByIDsSlow = async (
  storiesIDs: number[]
): Promise<(Story | null)[]> => {
  const result: (Story | null)[] = [];
  const start = Date.now();

  for (let i = 0; i < storiesIDs.length; i++) {
    const story: Story | null = await getStoryById(storiesIDs[i]);
    result.push(story);
  }

  const end = Date.now();
  console.log("Slow: ", (end - start) / 1000);
  return result;
};

const getStoryById = async (storyID: number): Promise<Story | null> => {
  const url = `${HACKER_NEWS_API_BASE_URL}item/${storyID}${HACKER_NEWS_API_URL_SUFFIX}`;
  const response = await axios.get(url);
  // console.log(response);
  if (response.status === 200 && response.data) {
    return response.data;
  }

  return null;
};

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
