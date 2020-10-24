import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getEntries from "app/entries/queries/getEntries"

const ITEMS_PER_PAGE = 100

export const EntriesList: BlitzPage = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ entries, hasMore }] = usePaginatedQuery(getEntries, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <div>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <Link href="/entries/[entryId]" as={`/entries/${entry.id}`}>
              <a>{entry.text}</a>
            </Link>
          </li>
        ))}
      </ul>

      {/* <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button> */}
    </div>
  )
}

const EntriesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/entries/new">
          <a>Create Entry</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <EntriesList />
      </Suspense>
    </div>
  )
}

EntriesPage.getLayout = (page) => <Layout title={"Entries"}>{page}</Layout>

export default EntriesPage
