import Checkoutstep from "@/components/Shipping/Checkoutstep"
import ShippingForm from "@/components/Shipping/ShippingForm"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Address = async () => {
  const hasuser = await currentUser()
  if (!hasuser) {
    redirect("/")
  }
if (hasuser.address) {
    redirect("/payment")
  }
  return (
    <div className="flex flex-col justify-between items-center">
      <Checkoutstep current={1} />
      <ShippingForm />
    </div>
  )
}
export default Address