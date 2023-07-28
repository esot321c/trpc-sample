import { axiosGetFetcher } from "@utils/axios";
import useSWR from "swr";

export const useProjectInfo = (projectName: string) => {
  const { data, error } = useSWR(`${process.env.API_URL}/projects/${projectName}`, axiosGetFetcher);

  return {
    projectInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
};
