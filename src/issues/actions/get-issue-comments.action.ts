import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { GithubIssue } from "../interfaces/issue.interface";

export const getIssueComments = async (
  issueNumber: number
): Promise<GithubIssue[]> => {
  await sleep(1000); // Simulate a delay for demonstration purposes
  const { data } = await githubApi.get<GithubIssue[]>(
    `/issues/${issueNumber}/comments`
  );

  return data;
};
