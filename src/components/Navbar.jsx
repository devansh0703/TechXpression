import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="flex justify-center gap-8 bg-black w-full mx-auto py-6 px-12 shadow-lg">
        <li>
          <Link
            to="/blog"
            className="text-white text-lg font-semibold py-3 px-6 border-2 border-transparent rounded-md hover:border-green-400 hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            to="/tutorial"
            className="text-white text-lg font-semibold py-3 px-6 border-2 border-transparent rounded-md hover:border-green-400 hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Tutorials
          </Link>
        </li>
        <li>
          <Link
            to="/Info"
            className="text-white text-lg font-semibold py-3 px-6 border-2 border-transparent rounded-md hover:border-green-400 hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Detect & Train
          </Link>
        </li>
        <li>
          <Link
            to="/Quiz"
            className="text-white text-lg font-semibold py-3 px-6 border-2 border-transparent rounded-md hover:border-green-400 hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Quizzes
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
