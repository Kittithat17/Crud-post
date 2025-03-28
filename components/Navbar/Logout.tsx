import { SignedIn, SignOutButton } from "@clerk/nextjs"

const Logout = () => {
  return (
    <SignedIn >
        <SignOutButton redirectUrl="/" >
      Logout
    </SignOutButton>

        
    </SignedIn>
  )
}
export default Logout