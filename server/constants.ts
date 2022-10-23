const API_PREFIX = "api";

export enum BACKEND_ROUTES {
  NEWS = "/news",
  NEWS_ITEM = "/newsItem",
}

export const HACKER_NEWS_API_BASE_URL: string =
  "https://hacker-news.firebaseio.com/v0/";
export const HACKER_NEWS_API_URL_SUFFIX: string = ".json?print=pretty";

export const HACKER_NEWS_STORIES_LIMIT: number = 100;
