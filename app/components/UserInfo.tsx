import { Link, BlitzPage, useMutation } from "blitz"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  const className = "px-2 py-1 rounded bg-green-400 text-black"

  if (currentUser) {
    return (
      <>
        <button
          className={className}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
      </>
    )
  } else {
    return (
      <>
        <Link href="/signup">
          <a className={className}>
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href="/login">
          <a className={className}>
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

export default UserInfo
