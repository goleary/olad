import { Suspense } from "react"

import UserInfo from "./UserInfo"

const NavBar = () => (
  <div className="p-2 border-b-2 border-current">
    <div className="w-full max-w-screen-lg m-auto justify-center flex items-center">
      <div className="flex-grow">ONE LINE A DAY</div>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  </div>
)

export default NavBar
