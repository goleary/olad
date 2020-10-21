import React from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createEntry from "app/entries/mutations/createEntry"
import EntryForm from "app/entries/components/EntryForm"
import { useCurrentUser } from "app/hooks/useCurrentUser"

const NewEntryPage: BlitzPage = () => {
  const router = useRouter()
  const [createEntryMutation] = useMutation(createEntry)
  const currentUser = useCurrentUser()

  return (
    <div>
      <h1>Create New Entry</h1>

      <EntryForm
        onSubmit={async (text) => {
          try {
            if (!currentUser) {
              throw Error("No current user")
            }
            const entry = await createEntryMutation({
              data: { text, user: { connect: { id: currentUser.id } } },
            })
            alert("Success!" + JSON.stringify(entry))
            router.push("/entries/[entryId]", `/entries/${entry.id}`)
          } catch (error) {
            alert("Error creating entry " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/entries">
          <a>Entries</a>
        </Link>
      </p>
    </div>
  )
}

NewEntryPage.getLayout = (page) => <Layout title={"Create New Entry"}>{page}</Layout>

export default NewEntryPage
