import { Entry } from "@prisma/client"
import getEntries from "app/entries/queries/getEntries"
import { useQuery } from "blitz"
import { useCurrentUser } from "./useCurrentUser"

type Aggregation = "week" | "month" | "year"

export const useEntries = (aggregation?: Aggregation) => {
  const user = useCurrentUser()

  const [{ entries }] = useQuery(
    getEntries,
    {
      where: { userId: user?.id },
      orderBy: { createdAt: "desc" },
    },
    { enabled: user }
  )
  return { entries }
}
