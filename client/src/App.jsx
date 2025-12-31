import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import { useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import Layout from './pages/admin/Layout'
import AddShows from './pages/admin/AddShows'
import Dashboard from './pages/admin/Dashboard'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'

const App = () => {
  // whenever the route is admin do not show navbar
  const isAdminRoute = useLocation().pathname.startsWith('/admin');
  return (
    <>
    <Toaster/>
      {!isAdminRoute && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Movies/>} />
          <Route path='/movies/:id' element={<MovieDetails/>} />
          <Route path='/movies/:id/:date' element={<SeatLayout/>} />
          <Route path='/my-bookings' element={<MyBookings/>} />
          <Route path='/favorite' element={<Favorite/>} />

          {/* admin routes */}
          {/* <Route path='/admin/*' element={user ? <Layout/> : (
            <div className='min-h-screen flex justify-center items-center'>
            <SignIn fallbackRedirectUrl={'/admin'}/>
            </div>
           )}> */}
           <Route path='/admin/*' element={<Layout/>}>
            <Route index element={<Dashboard/>} />
            <Route path='add-shows' element={<AddShows/>} />
            <Route path='list-shows' element={<ListShows/>} />
            <Route path='list-bookings' element={<ListBookings/>} /> 
          </Route>
      </Routes>
      {/* footer, navbar is display all pages except admin page */}
      { !isAdminRoute && <Footer />}
    </>
  )
}

export default App
