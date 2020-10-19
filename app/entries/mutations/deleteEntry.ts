import { Ctx } from "blitz"
import db, { EntryDeleteArgs } from "db"

type DeleteEntryInput = Pick<EntryDeleteArgs, "where">

export default async function deleteEntry({ where }: DeleteEntryInput, ctx: Ctx) {
  ctx.session.authorize()

  const entry = await db.entry.delete({ where })

  return entry
}
