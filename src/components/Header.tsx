import { NavLink } from 'react-router';
import { useState } from 'react';
import logoBlack from '../assets/images/logo-black.png';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(open => !open);
  };
  return (
    <div className="fixed z-50 w-full border-b-0 shadow-md py-[6px] bg-white">
      {isOpen && <MobileMenu onToggleMenu={toggleMenu} />}
      <div className="container flex justify-between items-center container-centered">
        <img src={logoBlack} alt="logo" />
        <div className="hidden md:flex gap-6">
          <NavLink to={'/'}>Characters</NavLink>
          <NavLink to={'locations'}>Locations</NavLink>
          <NavLink to={'episodes'}>Episodes</NavLink>
        </div>
        <svg onClick={toggleMenu} className="md:hidden size-6 fill-gray4">
          <use href="./sprite.svg#icon-burger1"></use>
        </svg>
      </div>
    </div>
  );
}
