import React, { useEffect, useState } from 'react'
import './herobanner.scss'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Img from '../../../components/lazyLoadImage/Img'
const Herobanner = () => {
  const [background, setBackground] = useState('')
  const [query, setQuery] = useState('')
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home)
  const { data, loading } = useFetch("/movie/upcoming")

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(bg)
  }, [data])

  // console.log(background)
  const searchQueryHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }
  return (

    <div className="heroBanner">
      {!loading && <div className="backdrop-img">
        <Img src={background} />
      </div>}
      <div className="opacity-layer">

      </div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome !!</span>
          <span className="subTitle">MovieCluB is an Indian subscription video on-demand over-the-top streaming service owned by The Walt MovieCluB Company India and operated by MovieCluB Streaming</span>
          <div className="searchInput">
            <input type="text" placeholder='Search for movie or Tv show....' onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler} />
            <button>Search</button>
          </div>
        </div>
        </ContentWrapper>
    </div>
  )
}

export default Herobanner