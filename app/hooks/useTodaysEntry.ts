import { Entry } from "@prisma/client"
import createEntry from "app/entries/mutations/createEntry"
import updateEntry from "app/entries/mutations/updateEntry"
import getEntries from "app/entries/queries/getEntries"
import { useMutation, useQuery } from "blitz"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useCurrentUser } from "./useCurrentUser"
import { useEntries } from "./useEntries"

export const useTodaysEntry = () => {
  const user = useCurrentUser()
  const [todaysEntry, setTodaysEntry] = useState<Entry>()
  const [createEntryMutation] = useMutation(createEntry)
  const [updateEntryMutation] = useMutation(updateEntry)
  const { entries } = useEntries()

  const latest = entries?.[0]

  useEffect(() => {
    const checkLatestAndCreateIfNeeded = async () => {
      if (!latest) return
      if (!user) {
        throw Error("cant create entry with no user")
      }
      if (todaysEntry) return
      // TODO - make this compare dates in this timezone
      if (latest && latest.createdAt < new Date(Date.now() - 24 * 60 * 60 * 1000)) {
        const entry = await createEntryMutation({
          data: { text: "", user: { connect: { id: user.id } } },
        })
        setTodaysEntry(entry)
      } else {
        setTodaysEntry(latest)
      }
    }
    checkLatestAndCreateIfNeeded()
  }, [latest, createEntryMutation, todaysEntry, user])

  const updateText = useCallback(
    async (text) => {
      await updateEntryMutation({
        where: { id: todaysEntry?.id },
        data: { text },
      })
    },
    [todaysEntry?.id, updateEntryMutation]
  )

  return { todaysEntry, updateText }
}
