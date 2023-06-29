import { useState, useEffect } from 'react'
import { fetchData } from './utils/api.js'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice.js'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import SearchResult from './pages/searchresult/SearchResult'
import Notfound from './pages/404/Notfound'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home)
  useEffect(() => {
    fetchApiConfig()
  }, [])

  const fetchApiConfig = () => {
    fetchData('/configuration').then((response) => {
      console.log(response)
      const url = {
        backdrop: response.images.secure_base_url + "original",
        poster: response.images.secure_base_url + "original",
        profile: response.images.secure_base_url + "original"
      }
      dispatch(getApiConfiguration(url))
    })
  }
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/:mediaType/:id'></Route>
        <Route path='/search/:query' element={<SearchResult />}></Route>
        <Route path='/explore/:mediaType' element={<Explore />}></Route>
        <Route path='*' element={Notfound} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
