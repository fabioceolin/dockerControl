import { useQuery } from "react-query";
import { api } from "../api";

type Ports = {
  PrivatePort: number;
  Type: String;
};

type Containers = {
  Id: string;
  Names: Array<string>;
  Image: string;
  State: string;
  Status: string;
  Ports: Array<Ports>;
};

export async function getContainers(): Promise<Containers[]> {
  const { data } = await api.get<Containers[]>("containers/json?all=1");

  const containers = data.map((container) => {
    return {
      Id: container.Id.slice(0, 12),
      Names: container.Names.map((name) => {
        return name.replace("/", "");
      }),
      Image: container.Image,
      State: container.State,
      Status: container.Status,
      Ports: container.Ports,
    };
  });

  return containers;
}

export function useContainers() {
  return useQuery(["containers"], () => getContainers(), {
    staleTime: 1000 * 5,
  });
}
