import PlaceOrderPageClient from "@/components/PlaceOrderPageClient";
import { Suspense } from "react";


export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <PlaceOrderPageClient />
    </Suspense>
  );
}
