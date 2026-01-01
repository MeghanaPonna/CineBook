import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useAppContext } from '../context/AppContext'


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const {user} = useUser();
    const {openSignIn} = useClerk()

    const navigate = useNavigate();
    const {favoriteMovies} = useAppContext()

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
      {/* <Link to='/' className='max-md:flex-1'> */}
      <NavLink to="/" className="max-md:flex-1">
      <img src={assets.logo} alt="" className='w-50 h-auto' />
      </NavLink>

      {/* menu items-navigate different pages */}
      <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${ isMenuOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

            <XIcon className='md:hidden w-6 h-6 cursor-pointer absolute top-6 right-6'  onClick={()=> setIsMenuOpen(!isMenuOpen)}/>

            {/* <Link onClick={()=> {scrollTo(0,0); setIsMenuOpen(false)}} to='/'>Home</Link>
            <Link onClick={()=> {scrollTo(0,0); setIsMenuOpen(false)}} to='/movies'>Movies</Link>
            <Link onClick={()=> {scrollTo(0,0); setIsMenuOpen(false)}} to='/'>Theaters</Link>
            <Link onClick={()=> {scrollTo(0,0); setIsMenuOpen(false)}} to='/'>Releases</Link>
            <Link onClick={()=> {scrollTo(0,0); setIsMenuOpen(false)}} to='/favorite'>Favorites</Link> */}
            <NavLink
                to="/"
                onClick={() => { scrollTo(0,0); setIsMenuOpen(false); }}
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
                >
                Home
                </NavLink>

                <NavLink
                to="/movies"
                onClick={() => { scrollTo(0,0); setIsMenuOpen(false); }}
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
                >
                Movies
                </NavLink>

                <NavLink
                to="/theaters"
                onClick={() => { scrollTo(0,0); setIsMenuOpen(false); }}
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
                >
                Theaters
                </NavLink>

                <NavLink
                to="/releases"
                onClick={() => { scrollTo(0,0); setIsMenuOpen(false); }}
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
                >
                Releases
                </NavLink>

                {favoriteMovies.length > 0 && <NavLink
                to="/favorite"
                onClick={() => { scrollTo(0,0); setIsMenuOpen(false); }}
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
                >
                Favorites
                </NavLink>}


        </div>

       {/* user login button and search icon */}
      <div className='flex items-center gap-8'>
        <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer'/>

        {
            !user ? (
                <button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Login</button>
            ) : (
                <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label='My Bookings' labelIcon={<TicketPlus width={15} />} onClick={()=> navigate('/my-bookings')}  />
                    </UserButton.MenuItems>
                </UserButton>
            )
        }
        
      </div>

      <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick={()=> setIsMenuOpen(!isMenuOpen)}/>
      
    </div>
  )
}

export default Navbar
