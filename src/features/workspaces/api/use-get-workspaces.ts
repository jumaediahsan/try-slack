import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useGetWorkspaces = () => {
  // @ts-ignore
  const data = useQuery(api.workspaces.current);
  const isLoading = data === undefined;

  return { data, isLoading};
}