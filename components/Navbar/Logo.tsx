
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex items-center gap-4">
      
      <Link href="/" className="text-2xl font-bold">
        Sneaker<span style={{ color: "red" }}>X</span>


      </Link>
    </div>
  );
};
export default Logo;
