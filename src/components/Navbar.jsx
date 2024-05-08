import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  logo,
  // avatar,
  menu,
  close,
  search,
  notifications,
  // arrowDropDown,
} from "@/assets/images";
import useAuth from "@/hooks/useAuth";

const variant = {
  hide: { x: 50, opacity: 0 },
  show: { x: 0, opacity: 1 },
};

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
      <motion.li variants={variant}>
        <Link to="/" onClick={collapseMenu}>
          Home
        </Link>
      </motion.li>
      <motion.li variants={variant}>
        <Link to="/" onClick={collapseMenu}>
          TV Shows
        </Link>
      </motion.li>
      <motion.li variants={variant}>
        <Link to="/" onClick={collapseMenu}>
          Movies
        </Link>
      </motion.li>
      <motion.li variants={variant}>
        <Link to="/" onClick={collapseMenu}>
          News & Popular
        </Link>
      </motion.li>
      <motion.li variants={variant}>
        <Link to="/favorites" onClick={collapseMenu}>
          My List
        </Link>
      </motion.li>
    </>
  );

  return (
    <section
      className={`nav | fixed top-0 left-0 right-0 z-50 text-white transition-colors ${
        isScrolled ? "bg-[rgba(0,0,0,.75)] backdrop-blur" : ""
      }`}
    >
      <div className="nav__content | w-11/12 max-w-7xl mx-auto flex gap-6 items-center">
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
            className="list-none flex items-center gap-4 sm:gap-8 font-semibold"
            initial="hide"
            animate="show"
            transition={{ staggerChildren: 0.1 }}
          >
            <ListItems />
          </motion.ul>
        </nav>

        <ul className="list-none flex items-center capitalize gap-4 ml-auto">
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
          {/* <li className="cursor-pointer flex items-center">
            <img
              src={avatar}
              alt="Avatar"
              className="max-w-[2rem] object-contain"
              role="image"
            />
            <img src={arrowDropDown} alt="" className="w-6" role="image" />
          </li> */}
          {user ? (
            <li className="cursor-pointer flex items-center">
              <button onClick={handleLogOut}>Logout</button>
            </li>
          ) : (
            <>
              <li className="cursor-pointer flex items-center">
                <Link to="/login">Sign in</Link>
              </li>
              <li className="cursor-pointer flex items-center">
                <Link to="/register">Sign up</Link>
              </li>
            </>
          )}
        </ul>

        {isExpanded && (
          <motion.nav
            className="fixed inset-0 z-40 h-screen bg-neutral-950 font-semibold flex justify-center items-center text-center"
            id="primary-navigation"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0.5, x: "100vh" }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.ul
              className="list-none flex flex-col gap-4 font-semibold"
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
