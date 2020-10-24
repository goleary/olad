import { ReactNode } from "react"
import { Head } from "blitz"

import NavBar from "app/components/NavBar"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "olad"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="w-full max-w-screen-md m-auto">{children}</div>
    </>
  )
}

export default Layout
