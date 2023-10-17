import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const axiosConfig = {
  headers: {
    "Accept-Version": "v1",
    Authorization: `Client-ID ${import.meta.env.VITE_APP_CLIENT_KEY}`,
  },
};
export const GetTopicListQueryKey = "getTopicListQueryKey";
export const getTopicListQuery = () => {
  return useQuery(
    [GetTopicListQueryKey],
    async () => {
      return axios
        .get(`${import.meta.env.VITE_APP_SERVER}/topics?page=2`, axiosConfig)
        .then((response) => {
          return response.data;
        });
    },
    {
      onError: (err) => {
        console.log(err);
      },
      onSuccess: (data) => {
        console.log(data);
      },
      enabled: true,
    }
  );
};
