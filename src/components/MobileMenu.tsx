import logoBlack from '../assets/images/logo-black.png';
import { NavLink } from 'react-router';

export default function MobileMenu({ onToggleMenu }) {
  return (
    <div className="fixed w-full min-h-screen z-50 md:hidden bg-white">
      <div className="container flex justify-between items-center border-b-0 shadow-mob-menu container-centered">
        <img src={logoBlack} alt="logo" />
        <svg onClick={onToggleMenu} className="size-6 fill-gray10">
          <use href="./sprite.svg#icon-close"></use>
        </svg>
      </div>
      <div className="flex flex-col items-center font-bold text-2xl text-black gap-12 pt-12.5">
        <NavLink onClick={onToggleMenu} to={'/'}>
          Characters
        </NavLink>
        <NavLink onClick={onToggleMenu} to={'locations'}>
          Locations
        </NavLink>
        <NavLink onClick={onToggleMenu} to={'episodes'}>
          Episodes
        </NavLink>
      </div>
    </div>
  );
}
