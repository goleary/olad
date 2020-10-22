import React, { Suspense, useEffect, useState } from "react"
import Layout from "app/layouts/Layout"
import { usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getEntries from "app/entries/queries/getEntries"
import { useTodaysEntry } from "app/hooks/useTodaysEntry"

const ITEMS_PER_PAGE = 100

export const EntriesList: BlitzPage = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ entries, hasMore }] = usePaginatedQuery(getEntries, {
    orderBy: { createdAt: "desc" },
    skip: 1 + ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const { todaysEntry, updateText } = useTodaysEntry()

  const [todaysText, setTodaysText] = useState<string>(todaysEntry?.text ?? "")

  useEffect(() => setTodaysText(todaysEntry?.text ?? ""), [todaysEntry])

  // const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  // const goToNextPage = () => router.push({ query: { page: page + 1 } })
  var dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value
    setTodaysText(text)
    updateText(text)
  }

  return (
    <div className="rounded bg-yellow-200 h-3/4">
      <div className="divide-y divide-blue-200">
        <div className="flex ">
          <div className="px-2 pt-8 border-solid border-red-700 border-r-2 mr-1 w-1/4 h-full">
            today
          </div>
          <div className="flex-grow px-2 pt-8 border-solid border-red-700 border-l-2 h-full">
            <input
              className="bg-yellow-200 w-full"
              placeholder="what happened today?"
              value={todaysText}
              onChange={onInputChange}
            ></input>
          </div>
        </div>
        {entries.map((entry) => (
          <div key={entry.id} className="flex">
            <div className="px-2 border-solid border-red-700 border-r-2 mr-1 w-1/4">
              {entry.createdAt.toLocaleDateString("en-US", dateOptions)}
            </div>
            <div className="flex-grow px-2 border-solid border-red-700 border-l-2">
              {entry.text}
            </div>
          </div>
        ))}
      </div>

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
      <Suspense fallback={<div>Loading...</div>}>
        <EntriesList />
      </Suspense>
    </div>
  )
}

NotebookPage.getLayout = (page) => <Layout title={"Notebook"}>{page}</Layout>

export default NotebookPage
