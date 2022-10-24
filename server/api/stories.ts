import axios from "axios";
import { Story } from "../types";
import {
  HACKER_NEWS_API_BASE_URL,
  HACKER_NEWS_API_URL_SUFFIX,
  HACKER_NEWS_STORIES_LIMIT,
} from "./constants";
import { concurencyBalancer, isResponseSuccess } from "./utils";

/**
 *
 * @param useLimit
 * @returns Promise<number[]>
 */
export const getNewStoriesIDs = async (useLimit = false): Promise<number[]> => {
  const url = `${HACKER_NEWS_API_BASE_URL}newstories${HACKER_NEWS_API_URL_SUFFIX}`;
  const response = await axios.get(url);
  if (isResponseSuccess(response) && Array.isArray(response.data)) {
    if (useLimit) {
      const slicedIDs: number[] = response.data.slice(
        0,
        HACKER_NEWS_STORIES_LIMIT
      );
      return slicedIDs;
    } else {
      return response.data;
    }
  }
  return [];
};

/**
 *
 * @param storiesIDs
 * @returns number []
 */
export const getStoriesByIDs = async (
  storiesIDs: number[]
): Promise<Story[]> => {

  const start = Date.now();
  const result = await concurencyBalancer<Story>(50, storiesIDs, getStoryById);

  const end = Date.now();
  console.log("Time took all: ", (end - start) / 1000);
  return result;
};

/**
 *
 * @param storyID
 * @returns
 */
export const getStoryById = async (storyID: number): Promise<Story | null> => {
  const url = `${HACKER_NEWS_API_BASE_URL}item/${storyID}${HACKER_NEWS_API_URL_SUFFIX}`;
  const response = await axios.get(url);

  if (isResponseSuccess(response)) {
    return response.data;
  }

  return null;
};

async function take3subtake1part1(storiesIDs: number[]) {
  const start = Date.now();
  const listOfArguments: number[] = storiesIDs;
  const concurrencyLimit = 50;
  // Enhance arguments array to have an index of the argument at hand
  const emptyArray: { val: number; ind: number }[] = [];
  const argsCopy = emptyArray.concat(
    listOfArguments.map((val, ind) => ({ val, ind }))
  );
  const result = new Array(listOfArguments.length);
  const promises = new Array(concurrencyLimit).fill(Promise.resolve());
  // Recursively chain the next Promise to the currently executed Promise
  function chainNext(p: Promise<unknown>): Promise<unknown> {
    if (argsCopy.length) {
      const arg = argsCopy.shift();
      return p.then(() => {
        // Store the result into the array upon Promise completion
        if (!arg) {
          return;
        }
        const operationPromise = getStoryById(arg.val).then((r) => {
          result[arg.ind] = r;
        });
        return chainNext(operationPromise);
      });
    }
    return p;
  }

  await Promise.all(promises.map(chainNext));

  const end = Date.now();
  console.log("Time took with concurrency: ", (end - start) / 1000);
  return result;
}
