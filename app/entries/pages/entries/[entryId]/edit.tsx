import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getEntry from "app/entries/queries/getEntry"
import updateEntry from "app/entries/mutations/updateEntry"
import EntryForm from "app/entries/components/EntryForm"

export const EditEntry = () => {
  const router = useRouter()
  const entryId = useParam("entryId", "number")
  const [entry, { mutate }] = useQuery(getEntry, { where: { id: entryId } })
  const [updateEntryMutation] = useMutation(updateEntry)

  return (
    <div>
      <h1>Edit Entry {entry.id}</h1>
      <pre>{JSON.stringify(entry)}</pre>

      <EntryForm
        initialValue={entry.text}
        onSubmit={async (text) => {
          try {
            const updated = await updateEntryMutation({
              where: { id: entry.id },
              data: { text },
            })
            await mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/entries/[entryId]", `/entries/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating entry " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditEntryPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditEntry />
      </Suspense>

      <p>
        <Link href="/entries">
          <a>Entries</a>
        </Link>
      </p>
    </div>
  )
}

EditEntryPage.getLayout = (page) => <Layout title={"Edit Entry"}>{page}</Layout>

export default EditEntryPage
