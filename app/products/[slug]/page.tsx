"use client";

import { useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cartService/page";

type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  mainImage: string;
  colors: string[];
  tagline: string;
  environmentalInfo: string;
  description: string;
  colorName: string;
  styleCode: string;
  madeIn: string;
  isNew: boolean;
  isBestSeller: boolean;
  thumbnails: { id: string; img: string; alt: string }[];
  sizes: { id: string; label: string }[];
};

type PageParams = {
  slug:string
}
type ProductPageProps = {
  params: PageParams;
  
};

// **CORRECTED COMPONENT SIGNATURE**
export default function ProductPage({ params }: ProductPageProps) {
  // Destructure slug directly from params, as it's guaranteed to be PageParams
  const { slug } = params;
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${URL}/getSneaker/${slug}`);
        console.log("Response status:", res.status);
          
        if (!res.ok) {
          router.replace("/404");
          return;
        }
        
        // Add this line to see the raw response data
        const text = await res.text();
        console.log("Raw response:", text);
        
        // Then try to parse it as JSON
        let data;
        try {
          data = JSON.parse(text);
          console.log("Parsed data:", data);
        } catch (e) {
          console.error("JSON parse error:", e);
        }
        
        setProduct(data);
      } catch (err) {
        console.error(err);
        router.replace("/404");
      }
    };

    fetchProduct();
  }, [router, slug]);

  if (!product) {
    return <div className="p-10 text-center text-gray-500">Loading product...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8 font-sans">
      <div className="flex flex-col lg:flex-row gap-8">
        <ProductImages product={product} />
        <ProductInfo product={product} />
      </div>
    </main>
  );
}

function ProductImages({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState<string>(product.mainImage || '');
  const [zoom, setZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoom) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="lg:w-3/5">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex md:flex-col gap-2 order-2 md:order-1">
          {product.thumbnails && product.thumbnails.length > 0 && product.thumbnails.map((thumb) => (
            <div 
              key={thumb.id} 
              className={`rounded-sm p-1 cursor-pointer ${selectedImage === thumb.img ? 'bg-black/15' : 'bg-gray-100'}`}
              onClick={() => setSelectedImage(thumb.img)}
            >
              <Image src={thumb.img} alt={thumb.alt} width={80} height={80} className="w-20 h-20 object-contain" />
            </div>
          ))}
        </div>

        <div 
          className="relative bg-gray-100 rounded-lg order-1 md:order-2 flex-1 overflow-hidden"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={selectedImage}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto cursor-zoom-in"
            priority
          />
          {zoom && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundSize: '150%',
                backgroundRepeat: 'no-repeat',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ProductInfo({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  const { addToCart,items } = useCart();
  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }
    const productCopy = JSON.parse(JSON.stringify(product));
    addToCart(productCopy, selectedSize, 1, true);
    
    console.log("Cart items after adding:", items);
    router.push('/cart');
  };
  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="lg:w-2/5">
      <div className="text-sm text-orange-600 mb-2">{product.tagline}</div>
      <h1 className="text-2xl font-bold mb-1">{product.name}</h1>
      <div className="text-gray-600 mb-4">{product.subtitle}</div>
      <div className="text-xl font-bold mb-6">฿ {formatPrice(product.price)}</div>

      <SizeSelector 
        sizes={product.sizes} 
        selectedSize={selectedSize}
        onSelectSize={(size) => {
          setSelectedSize(size);
          setShowError(false);
        }}
        showError={showError}
      />

      <div className="flex items-center gap-4 mb-6">
        <Button 
          className="flex-1 py-9 rounded-full hover:bg-gray-800 transition font-bold text-lg"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>

      <ProductDetails 
        product={product} 
        activeAccordion={activeAccordion}
        toggleAccordion={toggleAccordion}
      />

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-2">Member Exclusive</h3>
        <p className="text-sm text-gray-600 mb-3">
          Earn 5% back when you use a Nike credit card. Join us or sign in.
        </p>
        <Button variant="outline" className="w-full border-black">
          Join Us
        </Button>
      </div>
    </div>
  );
}

function SizeSelector({ 
  sizes, 
  selectedSize, 
  onSelectSize,
  showError
}: { 
  sizes: Product["sizes"];
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
  showError?: boolean;
}) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <h3 className="font-medium">Select Size</h3>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {sizes && sizes.length > 0 && sizes.map((size) => (
          <button
            key={size.id}
            className={`border rounded-md py-3 px-2 text-center hover:border-black transition-colors ${
              selectedSize === size.label ? 'border-black bg-black text-white' : 'border-gray-300'
            }`}
            onClick={() => onSelectSize(size.label)}
          >
            {size.label} US
          </button>
        ))}
      </div>
      {showError && (
        <div className="mt-2 text-red-500 text-lg">
          Size selection is required
        </div>
      )}
    </div>
  );
}

function ProductDetails({ 
  product, 
  activeAccordion, 
  toggleAccordion 
}: { 
  product: Product;
  activeAccordion: number | null;
  toggleAccordion: (index: number) => void;
}) {
  const accordionItems = [
    { title: "Product Details", content: product.description },
    { title: "Shipping & Returns", content: "We offer free returns within 30 days." },
    { title: "Sustainability", content: product.environmentalInfo },
  ];

  return (
    <div className="border-t border-gray-200 pt-4">
      {accordionItems.map((item, index) => (
        <div key={index} className="border-b border-gray-200 py-4">
          <button 
            className="w-full flex justify-between items-center"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="font-medium">{item.title}</h3>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 transition-transform ${activeAccordion === index ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {activeAccordion === index && (
            <div className="mt-2 text-gray-600">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
