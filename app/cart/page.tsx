import Image from "next/image";
import Link from "next/link";

const Emptycart = () => {
  return ( 
    <div className="flex justify-center items-center mt-20"> {/*ต้องเพิ่ม function เวลากดadd to cartด้วย*/} 
      <div className="w-full max-w-md border-2 rounded-lg shadow-sm p-6 md:p-8 bg-white">
        {/* Empty cart content */}
        <div className="flex flex-col items-center">
          {/* Empty cart Image */}
          <Image
            src="/images/empty-cart.jpg"
            alt="Empty Cart"
            width={300}
            height={300}
            className="w-[200px] md:w-[300px] mb-6"
            priority={false}
          />

          {/* Empty cart Message */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2 text-black">Your cart is empty</h2>
            <p className="text-gray-600">
              You have not added anything in your cart.
              <br />
              Go ahead and explore categories.
            </p>
          </div>

          {/* Link to homepage */}
          <Link
            href="/"
            className="w-full py-3 px-6 rounded-md bg-black text-white text-lg font-medium text-center transition-transform active:scale-95 hover:opacity-75"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Emptycart;