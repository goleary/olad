import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getEntry from "app/entries/queries/getEntry"
import deleteEntry from "app/entries/mutations/deleteEntry"

export const Entry = () => {
  const router = useRouter()
  const entryId = useParam("entryId", "number")
  const [entry] = useQuery(getEntry, { where: { id: entryId } })
  const [deleteEntryMutation] = useMutation(deleteEntry)

  return (
    <div>
      <h1>Entry {entry.id}</h1>
      <pre>{JSON.stringify(entry, null, 2)}</pre>

      <Link href="/entries/[entryId]/edit" as={`/entries/${entry.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteEntryMutation({ where: { id: entry.id } })
            router.push("/entries")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowEntryPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/entries">
          <a>Entries</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Entry />
      </Suspense>
    </div>
  )
}

ShowEntryPage.getLayout = (page) => <Layout title={"Entry"}>{page}</Layout>

export default ShowEntryPage
