/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link } from 'react-router-dom';
import logo from '../assets/book.png'
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { setUser } from "../redux/features/auth/userSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();

  const { user }  = useAppSelector((state) => state?.user);

  const handleLogout = () => {
      localStorage.removeItem("user");
      dispatch(setUser({ firstName: null, lastName: null, email: null }));
    };

  return (
    <div className="bg-slate-800 text-white">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow rounded-box w-52 bg-slate-800"
            >
              <li>
                <button className="font-medium text-lg hover:text-cyan-400">
                  <Link to="/">Home</Link>
                </button>
              </li>
              <li>
                <button className="font-medium text-lg hover:text-cyan-400">
                  <Link to="/books">Books</Link>
                </button>
              </li>
              <li>
                <button className="font-medium text-lg hover:text-cyan-400">
                  <Link to="/add-new-book">Add new book</Link>
                </button>
              </li>
              {!user.email && (
                <>
                  <li>
                    <button className="font-medium text-lg hover:text-cyan-400">
                      <Link to="/signup">Signup</Link>
                    </button>
                  </li>
                  <li>
                    <button className="font-medium text-lg hover:text-cyan-400">
                      <Link to="/login">Login</Link>
                    </button>
                  </li>
                </>
              )}
              {user.email && (
                <>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="font-medium text-lg hover:text-cyan-400"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
          <img className="w-16 lg:w-36" src={logo} alt="book catalog logo" />
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button className="font-medium text-lg hover:text-cyan-400">
                <Link to="/">Home</Link>
              </button>
            </li>
            <li>
              <button className="font-medium text-lg  hover:text-cyan-400">
                <Link to="/books">Books</Link>
              </button>
            </li>
            <li>
              <button className="font-medium text-lg hover:text-cyan-400">
                <Link to="/add-new-book">Add new book</Link>
              </button>
            </li>
            {!user.email && (
              <>
                <li>
                  <button className="font-medium text-lg hover:text-cyan-400">
                    <Link to="/signup">Signup</Link>
                  </button>
                </li>
                <li>
                  <button className="font-medium text-lg hover:text-cyan-400">
                    <Link to="/login">Login</Link>
                  </button>
                </li>
              </>
            )}
            {user.email && (
              <>
                <li>
                  <button
                    onClick={handleLogout}
                    className="font-medium text-lg hover:text-cyan-400"
                  >
                    Signup
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
