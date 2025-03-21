import ShippingForm from "@/components/Shipping/ShippingForm"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Address = async () => {
  const hasuser = await currentUser()
  if (!hasuser) {
    redirect("/")
  }
  return (
    <div>
      <ShippingForm />
    </div>
  )
}
export default Address