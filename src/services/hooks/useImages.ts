import { useQuery } from "react-query";
import { api } from "../api";

type Images = {
  Id: string;
  RepoTags: Array<string>;
  Size: number;
};

export async function getImages(): Promise<Images[]> {
  const { data } = await api.get<Images[]>("images/json");
  return data;
}

export function useImages() {
  return useQuery(["images"], () => getImages(), {
    staleTime: 1000 * 5,
  });
}
