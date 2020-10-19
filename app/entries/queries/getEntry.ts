import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstEntryArgs } from "db"

type GetEntryInput = Pick<FindFirstEntryArgs, "where">

export default async function getEntry({ where }: GetEntryInput, ctx: Ctx) {
  ctx.session.authorize()

  const entry = await db.entry.findFirst({ where })

  if (!entry) throw new NotFoundError()

  return entry
}
