'use client';
import { Button } from "@/components/ui/button";
// import { createOrder } from "@/lib/actions/order.action";
import { ArrowRight, Loader } from "lucide-react";
//import { useRouter } from "next/navigation";
//import { useTransition } from "react";

const PlaceOrderForm = () => {
    //const router = useRouter();
   // const [isPending, startTransition] = useTransition();

    // const handleSubmit = async (event: React.FormEvent) => {
    //     event.preventDefault();
    //     startTransition(async () => {
    //         const res = await createOrder();
    //         if (res.redirectTo) {
    //             router.push(res.redirectTo);
    //         }
    //     });
    // }
    return (
        <>
            {/* <form onSubmit={handleSubmit} className="w-full"> */}
                <Button className="w-full" disabled={isPending}>
                    {isPending ? (
                        <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                        <ArrowRight className="w-4 h-4" />
                    )} {' '} Place Order
                </Button >
            {/* </form > */}
        </>
    );
}

export default PlaceOrderForm;