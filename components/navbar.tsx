import { FiSearch, FiHome } from "react-icons/fi";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-center fixed bottom-0 left-0 right-0 z-50 bg-black">
      <div className="container flex justify-around items-center py-3">
        <Link href="/" className="flex flex-col items-center text-white">
          <FiHome size={24} />
          Home
        </Link>
        <a href="/search" className="flex flex-col items-center text-white">
          <FiSearch size={24} />
          Search
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
