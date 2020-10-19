import { Ctx } from "blitz"
import db, { EntryUpdateArgs } from "db"

type UpdateEntryInput = Pick<EntryUpdateArgs, "where" | "data">

export default async function updateEntry({ where, data }: UpdateEntryInput, ctx: Ctx) {
  ctx.session.authorize()

  const entry = await db.entry.update({ where, data })

  return entry
}
