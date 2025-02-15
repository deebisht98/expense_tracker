import { Link } from "@tanstack/react-router";

const Navbar = () => {
  const className =
    "bg-gradient-to-r from-pink-600 to-orange-400 bg-clip-text text-transparent";
  return (
    <div className="m-auto flex max-w-lg justify-center divide-x rounded p-4">
      <Link
        to="/"
        className="px-4 py-2 duration-300 hover:bg-gray-100"
        activeProps={{ className }}
      >
        Home
      </Link>
      <Link
        to="/expenses"
        className="px-4 py-2 duration-300 hover:bg-gray-100"
        activeProps={{ className }}
      >
        Expenses
      </Link>
      <Link
        to="/create"
        className="px-4 py-2 duration-300 hover:bg-gray-100"
        activeProps={{ className }}
      >
        Create
      </Link>
      <Link
        to="/profile"
        className="px-4 py-2 duration-300 hover:bg-gray-100"
        activeProps={{ className }}
      >
        Profile
      </Link>
      <Link
        to="/about"
        className="px-4 py-2 duration-300 hover:bg-gray-100"
        activeProps={{ className }}
      >
        About
      </Link>
    </div>
  );
};

export default Navbar;
