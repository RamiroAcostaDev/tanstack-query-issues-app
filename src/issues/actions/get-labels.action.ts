import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { GithubLabel } from "../interfaces";

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(1000); // Simulate a delay for demonstration purposes
  const { data } = await githubApi.get<GithubLabel[]>("/labels");
  console.log("Labels fetched:", data);
  return data;
};
