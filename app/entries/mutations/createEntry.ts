import { Ctx } from "blitz"
import db, { EntryCreateArgs } from "db"

type CreateEntryInput = Pick<EntryCreateArgs, "data">
export default async function createEntry({ data }: CreateEntryInput, ctx: Ctx) {
  ctx.session.authorize()

  const entry = await db.entry.create({ data })

  return entry
}
