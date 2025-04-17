'use client';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Mock payment methods
const PAYMENT_METHODS = ["PayPal", "Stripe", "CashOnDelivery"];

// // Simple type for payment method
// type PaymentMethod = {
//   type: string;
// };

const PaymentMethodForm = ({ paymentMethodType }: { paymentMethodType: string | null }) => {
    const router = useRouter();
    const [selectedPayment, setSelectedPayment] = useState<string>(paymentMethodType || "");
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handlePaymentChange = (value: string) => {
        setSelectedPayment(value);
        setError(null);
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        if (!selectedPayment) {
            setError("Please select a payment method");
            return;
        }
        
        try {
            setIsPending(true);
            
            // Mock API call - simulate processing time
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock updating user data
            const updatedUser = {
                name: "Alex Johnson",
                id: "usr_543216789",
                email: "alex.johnson@example.com",
                paymentMethod: selectedPayment,
                // Other fields would remain the same
            };
            
            console.log("Updated user data:", updatedUser);
            
            // Show success message
            toast.success("Payment method updated successfully!");
            
            // Redirect to next page
            router.push('/place-order');
            
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
        } finally {
            setIsPending(false);
        }
    };
    
    return (
        <div className="flex justify-center items-center py-3">
            <div className="w-full max-w-md p-6">
                <h1 className="text-5xl font-semibold mb-4">Payment Method</h1>
                <p className="text-lg mb-6">Please select a payment method</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <RadioGroup
                            className="flex flex-col space-y-2"
                            onValueChange={handlePaymentChange}
                            defaultValue={paymentMethodType || ""}
                        >
                            {PAYMENT_METHODS.map((paymentMethod) => (
                                <div key={paymentMethod} className="flex items-center space-x-2">
                                    <RadioGroupItem value={paymentMethod} id={paymentMethod} />
                                    <Label htmlFor={paymentMethod} className="font-normal">
                                        {paymentMethod}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                        {error && <p className="mt-1 text-red-500">{error}</p>}
                    </div>
                    
                    <div className="flex gap-2">
                        <Button type="submit" disabled={isPending} className="w-full mt-6 py-5">
                            {isPending ? (
                                <Loader className="w-4 h-4 animate-spin" />
                            ) : (
                                <ArrowRight className="w-4 h-4" />
                            )}{' '}
                            Confirm Payment Method
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentMethodForm;