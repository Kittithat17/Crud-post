import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Orderhistory = async() => {
    const hasuser = await currentUser()
    if (!hasuser) {
      redirect("/")
    }
    return (
      <div>Orderhistory</div>
    )
  }
  export default Orderhistory