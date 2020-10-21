import { EntryCreateInput } from "@prisma/client"
import React, { useState } from "react"

type EntryFormProps = {
  initialValue?: string
  onSubmit: (text: string) => void
}

const EntryForm = ({ initialValue, onSubmit }: EntryFormProps) => {
  const [text, setText] = useState<string>(initialValue ?? "")
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(text)
      }}
    >
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="your line for the day"
      />
      <button>Submit</button>
    </form>
  )
}

export default EntryForm
