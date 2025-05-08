'use client';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// Mock payment methods
const PAYMENT_METHODS = ["PayPal", "Stripe", "CashOnDelivery"];

// Define type for address data
interface AddressData {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const PaymentMethodForm = ({ paymentMethodType }: { paymentMethodType?: string | null }) => {
    const searchParams = useSearchParams();
    const encodedAddressData = searchParams.get('addressData');
    const router = useRouter();
    const [selectedPayment, setSelectedPayment] = useState<string>(paymentMethodType || "");
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [addressData, setAddressData] = useState<AddressData | null>(null);

    useEffect(() => {
        if (encodedAddressData) {
          try {
            // Decode and parse the address data from URL
            const decodedData = JSON.parse(decodeURIComponent(encodedAddressData));
            setAddressData(decodedData);
          } catch (error) {
            console.error('Error parsing address data:', error);
            toast.error("Invalid address data. Please go back to the shipping step.");
          }
        } else {
          // Redirect back to shipping if no address data
        //   toast.error("Please enter shipping information first");
        //   router.push('/shipping-address');
            console.log("error at payment method page")
        }
    }, [encodedAddressData, router]);

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
        
        if (!addressData) {
            toast.error("Missing address information");
            router.push('/shipping-address');
            return;
        }
        
        try {
            setIsPending(true);
            
            // Continuing with the order process
            // Pass both the address data and payment method to the next page
            router.push(`/place-order?addressData=${encodedAddressData}&paymentMethod=${selectedPayment}`);
            
            // Show success message
            toast.success("Payment method selected!");
            
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
                            defaultValue={selectedPayment}
                        >
                            {PAYMENT_METHODS.map((paymentMethod) => (
                                <div key={paymentMethod} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50">
                                    <RadioGroupItem value={paymentMethod} id={paymentMethod} />
                                    <Label htmlFor={paymentMethod} className="font-normal cursor-pointer w-full">
                                        {paymentMethod}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                        {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => router.push('/shipping-address')}
                          className="w-1/3"
                        >
                            Back
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={isPending} 
                          className="w-2/3"
                        >
                            {isPending ? (
                                <>
                                  <Loader className="w-4 h-4 animate-spin mr-2" />
                                  Processing...
                                </>
                            ) : (
                                <>
                                  Continue
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentMethodForm;