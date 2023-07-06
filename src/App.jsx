import { useState, useEffect } from 'react'
import { fetchData } from './utils/api.js'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGeneres } from './store/homeSlice.js'
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
    genresCall()
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
  const genresCall = async () => {
    let promises = []
    let endpoints = ["tv", "movie"]
    let allGenres = {}
    endpoints.forEach((url) => {
      return promises.push(fetchData(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises)
    console.log(data)
    data.map(({ genres }) => {
      return genres.map((item) => allGenres[item.id] = item)
    })
    dispatch(getGeneres(allGenres))
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/:mediaType/:id' element={<Details />}></Route>
        <Route path='/search/:query' element={<SearchResult />}></Route>
        <Route path='/explore/:mediaType' element={<Explore />}></Route>
        <Route path='*' element={<Notfound/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
