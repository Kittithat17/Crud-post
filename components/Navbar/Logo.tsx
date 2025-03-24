import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex items-center gap-4">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={70}
          height={70}
          priority={true}
        />
      </Link>
      <Link href="/" className="text-2xl font-bold">
        Sneaker<span style={{ color: "red" }}>X</span>


      </Link>
    </div>
  );
};
export default Logo;
