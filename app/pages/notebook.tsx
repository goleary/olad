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

  // const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  // const goToNextPage = () => router.push({ query: { page: page + 1 } })
  var dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return (
    <div className="rounded bg-yellow-200">
      <ul className="divide-y divide-blue-200">
        {entries.map((entry) => (
          <div key={entry.id} className="flex">
            <div className="px-2 border-solid border-red-700 border-r-2 mr-1">
              {entry.createdAt.toLocaleDateString("en-US", dateOptions)}
            </div>
            <div className="flex-grow px-2 border-solid border-red-700 border-l-2">
              {entry.text}
            </div>
          </div>
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

const NotebookPage: BlitzPage = () => {
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

NotebookPage.getLayout = (page) => <Layout title={"Notebook"}>{page}</Layout>

export default NotebookPage
