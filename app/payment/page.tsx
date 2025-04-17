import { Metadata } from "next";
import { redirect } from "next/navigation";
import Checkoutstep from "@/components/Shipping/Checkoutstep"
import PaymentMethodForm from "./payment-method-form";
import { currentUser } from "@clerk/nextjs/server"

export const metadata: Metadata = {
    title: "Payment Method"
}

const alexJohnson = {
  name: "Alex Johnson",
  id: "usr_543216789",
  createdAt: new Date("2024-10-05T11:19:32.000Z"),
  updatedAt: new Date("2024-10-05T11:19:32.000Z"),
  email: "alex.johnson@example.com",
  password: null,
  role: "user",
  address: null,
  paymentMethod: null,
  emailVerified: null,
  image: null
};

const PaymentMethodPage = async () => {
  const hasuser = await currentUser()
  if (!hasuser) {
    redirect("/")
  }
  return (
    <div className="flex flex-col justify-between items-center">
            <Checkoutstep current={2} />
            <PaymentMethodForm paymentMethodType={alexJohnson.paymentMethod} />
        </div>

    );
}

export default PaymentMethodPage;