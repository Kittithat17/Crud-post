// app/products/[slug]/page.tsx

import ProductPageClient from "@/components/ProductPageClient";


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductPageClient slug={slug} />;
}
