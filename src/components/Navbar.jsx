import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import { logo, avatar } from '../assets';
import { motion } from 'framer-motion';

function Navbar() {
  const [ isExpanded, setIsExpanded ] = useState(false);
  const [ isScrolled, setIsScrolled ] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ListItems = () => (
    <>
      <li><a href="#">Home</a></li>
      <li><a href="#">TV Shows</a></li>
      <li><a href="#">Movies</a></li>
      <li><a href="#">News & Popular</a></li>
      <li><a href="#">My List</a></li>
      <li><a href="#">Browse By Languages</a></li>
    </>
  );

  return (
    <section className={`nav | fixed top-0 left-0 right-0 z-50 text-white transition-colors ${isScrolled ? 'bg-neutral-950' : ''}`}>
      <div className="nav__content | w-11/12 max-w-7xl mx-auto flex gap-6 items-center">
        <a href="#main-content" className="sr-only">skip to main content</a>

        <img
          src={logo}
          alt="Netflix Logo"
          className='max-w-[6.875rem] object-contain'
        />

        <nav className='hidden lg:block'
          id='primary-navigation'
          aria-label='Primary'
        >
          <ul className="list-none flex gap-4">
            <ListItems />
          </ul>
        </nav>

        <ul className="list-none flex items-center gap-4 ml-auto">
          <li>
            <form role='search' className='bg-neutral-900 p-1 rounded-full'>
              <label className='sr-only' htmlFor='navbar-search'>Search</label>

              <input
                type='text'
                id='navbar-search'
                className='bg-transparent outline-none'
              />

              <button
                type='submit'
                className='border-none bg-red-600 w-8 rounded-full aspect-square '
              >
                <span className='sr-only'>Submit Search</span>
                <span aria-hidden="true">&#128269;</span>
              </button>
            </form>
          </li>
          <li>
            <button>
              <span className="sr-only">Notification</span>
              <span aria-hidden="true">&#128276;</span>
            </button>
          </li>
          <li className='lg:hidden'>
            <button
              className='relative z-50'
              aria-expanded={isExpanded}
              aria-label="Mobile Navigation Button"
              aria-hidden={!isExpanded}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span className="sr-only">{isExpanded ? 'Close' : 'Open'} Menu</span>
              <span aria-hidden="true">&#9776;</span>
            </button>
          </li>
          <li>
            <img
              src={avatar}
              alt="Avatar"
              className='max-w-[2rem] object-contain rounded-full'
            />
          </li>
        </ul>

        {
          isExpanded && (
            <motion.nav
              className='fixed inset-0 z-40 bg-neutral-950 font-semibold flex justify-center items-center text-center'
              id='primary-navigation'
              aria-label='Mobile Navigation'
              initial={{opacity:0.5,x:'100vh'}}
              animate={{opacity:1,x:0}}
            >
              <ul className="list-none flex flex-col gap-4">
                <ListItems />
              </ul>
            </motion.nav>
          )
        }
      </div>
    </section>
  );
}

export default Navbar;