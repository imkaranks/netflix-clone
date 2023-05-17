import React, { useEffect, useState } from 'react';
import { logo, avatar } from '../assets';

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
      <div className="nav__content | w-11/12 max-w-7xl mx-auto flex items-center justify-between">
        <img
          src={logo}
          alt="Netflix Logo"
          className='max-w-[6.875rem] object-contain'
        />

        <nav className='hidden lg:block' aria-label='Primary'>
          <ul className="list-none flex gap-4">
            <ListItems />
          </ul>
        </nav>

        <ul className="list-none flex items-center gap-4">
          <li>
            <button>Search</button>
          </li>
          <li>
            <button>Notifications</button>
          </li>
          <li className='lg:hidden' aria-label="Mobile Navigation Button">
            <button className='relative z-50' onClick={() => setIsExpanded(!isExpanded)}>
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
            <nav className='fixed inset-0 z-40 bg-neutral-950 font-semibold flex justify-center items-center text-center' aria-label='Mobile Navigation'>
              <ul className="list-none flex flex-col gap-4">
                <ListItems />
              </ul>
            </nav>
          )
        }
      </div>
    </section>
  );
}

export default Navbar;