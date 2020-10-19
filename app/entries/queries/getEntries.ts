import { Ctx } from "blitz"
import db, { FindManyEntryArgs } from "db"

type GetEntriesInput = Pick<FindManyEntryArgs, "where" | "orderBy" | "skip" | "take">

export default async function getEntries(
  { where, orderBy, skip = 0, take }: GetEntriesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const entries = await db.entry.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.entry.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    entries,
    nextPage,
    hasMore,
    count,
  }
}
