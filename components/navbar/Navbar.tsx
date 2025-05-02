import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full bg-white shadow-sm z-20">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        <Link href="/">
          <Image
            src="/img/logo.png"
            alt="Logo"
            width={128}
            height={49}
            priority
          />
        </Link>
        <NavLink />
      </div>
    </div>
  );
};

export default Navbar;
