import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  logo,
  avatar,
  menu,
  close,
  search,
  notifications,
  arrowDropDown,
} from "@/assets/images";
import useAuth from "@/hooks/useAuth";

function Navbar() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 70) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const collapseMenu = () => {
    if (!isExpanded) return;
    setIsExpanded(false);
  };

  const handleLogOut = async () => {
    await logOut();
    navigate("/");
  };

  const ListItems = () => (
    <>
      <li>
        <Link to="/" onClick={collapseMenu}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/" onClick={collapseMenu}>
          TV Shows
        </Link>
      </li>
      <li>
        <Link to="/" onClick={collapseMenu}>
          Movies
        </Link>
      </li>
      <li>
        <Link to="/" onClick={collapseMenu}>
          News & Popular
        </Link>
      </li>
      <li>
        <Link to="/favorites" onClick={collapseMenu}>
          My List
        </Link>
      </li>
    </>
  );

  return (
    <section
      className={`nav | fixed left-0 right-0 top-0 z-50 text-white transition-colors ${
        isScrolled ? "bg-[rgba(0,0,0,.75)] backdrop-blur" : ""
      }`}
    >
      <div className="nav__content | mx-auto flex w-11/12 max-w-screen-2xl items-center gap-6">
        <a href="#main-content" className="sr-only">
          skip to main content
        </a>

        <Link to="/">
          <img
            src={logo}
            alt="Netflix Logo"
            className="max-w-[6.875rem] object-contain"
            role="image"
          />
        </Link>

        <nav
          className="hidden lg:block"
          id="primary-navigation"
          aria-label="Primary"
        >
          <motion.ul
            className="flex list-none items-center gap-4 font-semibold sm:gap-8"
            initial="hide"
            animate="show"
            transition={{ staggerChildren: 0.1 }}
          >
            <ListItems />
          </motion.ul>
        </nav>

        <ul className="ml-auto flex list-none items-center gap-4 capitalize">
          <li>
            <Link to="/search">
              <img src={search} alt="Search" role="image" />
            </Link>
          </li>
          <li>
            <button>
              <span className="sr-only">Notification</span>
              <img src={notifications} alt="Notification" role="image" />
            </button>
          </li>
          <li className="lg:hidden">
            <button
              className="relative z-50"
              aria-expanded={isExpanded}
              aria-label="Mobile Navigation Button"
              aria-hidden={!isExpanded}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span className="sr-only">
                {isExpanded ? "Close" : "Open"} Menu
              </span>
              <img src={isExpanded ? close : menu} alt="" role="image" />
            </button>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/me" className="flex cursor-pointer items-center">
                  <img
                    src={user?.photoURL || avatar}
                    alt="Me"
                    className="max-w-[2rem] object-contain"
                    role="image"
                  />
                  <img
                    src={arrowDropDown}
                    alt=""
                    aria-hidden="true"
                    className="w-6"
                    role="image"
                  />
                </Link>
              </li>
              <li className="flex cursor-pointer items-center">
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="flex cursor-pointer items-center">
                <Link to="/login">Sign in</Link>
              </li>
              <li className="flex cursor-pointer items-center">
                <Link to="/register">Sign up</Link>
              </li>
            </>
          )}
        </ul>

        {isExpanded && (
          <motion.nav
            className="fixed inset-0 z-40 flex h-screen items-center justify-center bg-neutral-950 text-center font-semibold"
            id="primary-navigation"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0.5, x: "100vh" }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.ul
              className="flex list-none flex-col gap-4 font-semibold"
              initial="hide"
              animate="show"
              transition={{ staggerChildren: 0.1 }}
            >
              <ListItems />
            </motion.ul>
          </motion.nav>
        )}
      </div>
    </section>
  );
}

export default Navbar;
